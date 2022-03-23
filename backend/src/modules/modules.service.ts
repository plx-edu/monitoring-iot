import { Injectable } from '@nestjs/common';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

// Chances of failure in %
const failureRate = 10;
const minutes = 10;

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(cmDto: CreateModuleDto) {
    return await this.prisma.module.create({
      data: {
        // 1. Insert module
        name: cmDto.name,
        location: cmDto.location,
        type: cmDto.type,
        current_value: cmDto.current_value,
        current_state: cmDto.current_state,
        uptime_start: cmDto.current_state ? new Date(Date.now()) : undefined,

        // 2. Insert corresponding state log
        state_log: {
          create: {
            state: cmDto.current_state,
            // cmDto.current_state === undefined ? false : cmDto.current_state,
            user_set: true,
          },
        },
        // 3. Insert corresponding data log
        data_log: {
          create: { measured: cmDto.current_value },
        },
      },
      include: {
        state_log: true,
        data_log: true,
        type_ref: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.module.findMany({
      include: {
        state_log: true,
        data_log: true,
        type_ref: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findAllActive() {
    return await this.prisma.module.findMany({
      where: {
        uptime_start: {
          not: null,
        },
      },
      select: {
        id: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.module.findUnique({
      where: {
        id: id,
      },
      include: {
        state_log: true,
        data_log: true,
        type_ref: true,
      },
    });
  }

  async update(id: number, umDto: UpdateModuleDto) {
    const currentModule = await this.prisma.module.findUnique({
      where: { id: id },
      select: { uptime_start: true, current_state: true },
    });

    return await this.prisma.module.update({
      where: {
        id: id,
      },
      data: {
        // 1. Update module
        // if state switches to false, value becomes null
        current_value:
          currentModule.current_state &&
          (umDto.current_state === undefined || umDto.current_state)
            ? umDto.current_value
            : null,

        current_state:
          currentModule.current_state === umDto.current_state
            ? currentModule.current_state
            : umDto.current_state,

        // set new uptimeStart if state(true) and current uptimeStart(null)
        uptime_start:
          umDto.current_state &&
          umDto.current_state !== currentModule.current_state
            ? new Date(Date.now())
            : (umDto.current_state === undefined || umDto.current_state) &&
              currentModule.current_state
            ? currentModule.uptime_start
            : null,

        // 2. Insert corresponding state log
        // insert state_log if current state different from new one
        state_log:
          umDto.current_state !== undefined &&
          umDto.current_state !== currentModule.current_state
            ? {
                create: {
                  state: umDto.current_state,
                  user_set: umDto.user_set,
                },
              }
            : {},

        // 3. Insert corresponding data log
        data_log:
          currentModule.current_state &&
          (umDto.current_state === undefined || umDto.current_state) &&
          umDto.current_value !== undefined
            ? {
                create: { measured: umDto.current_value },
              }
            : {},
      },
      include: {
        state_log: true,
        data_log: true,
        type_ref: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.module.delete({
      where: {
        id: id,
      },
    });
  }
}

// Random module insert script
const modServ = new ModulesService(new PrismaService());
async function randModuleChange() {
  console.log(':: Starting Module Change Script ::');

  const int = setInterval(async () => {
    // Retrieve list of all existing modules
    const modList = await modServ.findAllActive();

    if (modList.length <= 0) return;

    const utility = new UtilitiesService();
    const modToUpdate = modList[utility.getRandNb(0, modList.length)];

    // Seems to get lost at some point...
    if (!modToUpdate) return;

    const newData = {
      state: {
        current_state: false,
        user_set: false,
      },
      measurement: {
        current_value: utility.getRandNb(0, 50),
        user_set: false,
      },
    };

    // Type of change based on failure rate
    // <= failure rate: new state
    // else: new measurement
    const dataToUpdate: UpdateModuleDto =
      utility.getRandNb(1, 100) <= failureRate
        ? newData.state
        : newData.measurement;

    await modServ.update(modToUpdate.id, dataToUpdate);
  }, minutes * (60 * 1000));

  return () => clearInterval(int);
}

randModuleChange();

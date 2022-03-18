import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

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
    });
  }

  async findAll() {
    return await this.prisma.module.findMany({
      include: {
        state_log: true,
        data_log: true,
      },
      orderBy: {
        id: 'asc',
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
      },
    });

    // return module;
  }

  async update(id: number, umDto: UpdateModuleDto) {
    return await this.prisma.module.update({
      where: {
        id: id,
      },
      data: {
        // 1. Update module
        // if state switches to false, value becomes null
        current_value: umDto.current_state ? umDto.current_value : null,
        current_state: umDto.current_state,

        // 2. Insert corresponding state log
        state_log: {
          create: {
            state: umDto.current_state,
            user_set: umDto.user_set,
          },
        },
        // 3. Insert corresponding data log
        data_log: {
          create: { measured: umDto.current_value },
        },
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

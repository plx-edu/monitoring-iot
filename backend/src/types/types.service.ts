import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(private prisma: PrismaService) {}

  async create(createTypeDto: CreateTypeDto) {
    return await this.prisma.type_Ref.create({ data: createTypeDto });
    // return 'This action adds a new type';
  }

  async findAll() {
    return await this.prisma.type_Ref.findMany();
    // return `This action returns all types`;
  }

  async findOne(id: number) {
    return await this.prisma.type_Ref.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  async remove(id: number) {
    return await this.prisma.type_Ref.delete({
      where: {
        id: id,
      },
    });
  }
}

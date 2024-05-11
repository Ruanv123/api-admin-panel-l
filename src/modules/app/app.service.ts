import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Dados } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly db: PrismaService) {}

  async create(data: Omit<Dados, 'id'>): Promise<Dados> {
    const appAlreadyExists = await this.db.dados.findUnique({
      where: { codAfiliado: data.codAfiliado },
    });

    if (appAlreadyExists) {
      throw new HttpException('App already exists', HttpStatus.CONFLICT);
    }

    return await this.db.dados.create({
      data: {
        ...data,
      },
    });
  }

  async findAll(): Promise<Dados[]> {
    return await this.db.dados.findMany({});
  }

  async findOne(id: number): Promise<Dados> {
    return this.db.dados.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAppDto: Partial<Dados>) {
    const appAlreadyExists = await this.db.dados.findUniqueOrThrow({
      where: { nomeApp: updateAppDto.nomeApp },
    });

    if (!appAlreadyExists) {
      throw new HttpException('App not exists', HttpStatus.NOT_FOUND);
    }

    return await this.db.dados.update({
      where: {
        id,
      },
      data: {
        ...updateAppDto,
      },
    });
  }

  async remove(id: number): Promise<Dados> {
    const appAlreadyExists = this.db.dados.findUnique({
      where: { id },
    });

    if (!appAlreadyExists) {
      throw new HttpException('App not exists', HttpStatus.NOT_FOUND);
    }

    return await this.db.dados.delete({ where: { id } });
  }
}

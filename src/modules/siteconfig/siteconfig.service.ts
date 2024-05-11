import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Dados } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SiteconfigService {
  constructor(private readonly db: PrismaService) {}

  async create(createSiteconfigDto: Omit<Dados, 'id'>): Promise<Dados> {
    const siteconfigAlreadyExists = await this.db.dados.findUnique({
      where: { nomeApp: createSiteconfigDto.nomeApp },
    });

    if (siteconfigAlreadyExists) {
      throw new HttpException('Siteconfig already exists', HttpStatus.CONFLICT);
    }

    return await this.db.dados.create({
      data: {
        ...createSiteconfigDto,
      },
    });
  }

  async findAll(): Promise<Dados[]> {
    return await this.db.dados.findMany({});
  }

  async findOne(id: number): Promise<Dados> {
    const dados = await this.db.dados.findUnique({
      where: {
        id,
      },
    });

    if (!dados) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return dados;
  }

  async update(
    id: number,
    updateSiteconfigDto: Partial<Dados>,
  ): Promise<Dados> {
    const existingSite = await this.db.dados.findUnique({
      where: {
        id,
      },
    });

    if (!existingSite) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return await this.db.dados.update({
      where: {
        id,
      },
      data: {
        ...updateSiteconfigDto,
      },
    });
  }

  async remove(id: number) {
    const existingSite = await this.db.dados.findUnique({
      where: {
        id,
      },
    });

    if (!existingSite) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return await this.db.dados.delete({ where: { id } });
  }
}

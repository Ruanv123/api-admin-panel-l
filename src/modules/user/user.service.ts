import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

type UserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async create(data: UserDto): Promise<User> {
    const userAlreadyExist = await this.db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExist) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async findOne(email: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneByEMail(email: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  async resetPassword(id: number, newPassword: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });

    return updatedUser;
  }
}

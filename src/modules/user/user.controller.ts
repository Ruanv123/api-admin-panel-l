import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

type UserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }
}

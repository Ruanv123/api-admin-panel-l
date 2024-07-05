import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

type UserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

type UserResetPassword = {
  password: string;
};

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @IsPublic()
  @Post('/:id/reset-password')
  findAll(@Param('id') id: number, @Body() body: UserResetPassword) {
    return this.userService.resetPassword(id, body.password);
  }

  @IsPublic()
  @Get('/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEMail(email);
  }
}

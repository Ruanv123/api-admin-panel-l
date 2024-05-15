import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SiteconfigService } from './siteconfig.service';
import { ApiTags } from '@nestjs/swagger';
import { Dados } from '@prisma/client';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

@ApiTags('App config')
@Controller('app')
export class SiteconfigController {
  constructor(private readonly siteconfigService: SiteconfigService) {}

  @Post()
  create(@Body() createSiteconfigDto: Omit<Dados, 'id'>) {
    return this.siteconfigService.create(createSiteconfigDto);
  }

  @Get()
  findAll() {
    return this.siteconfigService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteconfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteconfigDto: any) {
    return this.siteconfigService.update(+id, updateSiteconfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteconfigService.remove(+id);
  }
}

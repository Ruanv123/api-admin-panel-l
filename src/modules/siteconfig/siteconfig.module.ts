import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SiteconfigController } from './siteconfig.controller';
import { SiteconfigService } from './siteconfig.service';

@Module({
  imports: [PrismaModule],
  controllers: [SiteconfigController],
  providers: [SiteconfigService],
})
export class SiteconfigModule {}

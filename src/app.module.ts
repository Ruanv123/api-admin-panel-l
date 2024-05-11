import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SiteconfigModule } from './modules/siteconfig/siteconfig.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, SiteconfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

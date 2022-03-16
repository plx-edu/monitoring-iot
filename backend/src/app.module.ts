import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ModulesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

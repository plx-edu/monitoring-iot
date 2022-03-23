import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { PrismaModule } from './prisma/prisma.module';
import { TypesModule } from './types/types.module';
import { UtilitiesModule } from './utilities/utilities.module';

@Module({
  imports: [ModulesModule, PrismaModule, TypesModule, UtilitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

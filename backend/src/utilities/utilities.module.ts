import { Global, Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';

@Global()
@Module({
  providers: [UtilitiesService],
})
export class UtilitiesModule {}

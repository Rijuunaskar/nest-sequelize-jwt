import { Module } from '@nestjs/common';
import { HookController } from './hook.controller';
import { HookService } from './hook.service';
import { ResponseService } from 'src/common-service/response.service';

@Module({
  controllers: [HookController],
  providers: [HookService,ResponseService]
})
export class HookModule {

}

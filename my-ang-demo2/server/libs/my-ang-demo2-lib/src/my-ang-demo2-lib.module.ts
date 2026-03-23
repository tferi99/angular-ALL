import { Module } from '@nestjs/common';
import { MyAngDemo2LibService } from './my-ang-demo2-lib.service';

@Module({
  providers: [MyAngDemo2LibService],
  exports: [MyAngDemo2LibService],
})
export class MyAngDemo2LibModule {}

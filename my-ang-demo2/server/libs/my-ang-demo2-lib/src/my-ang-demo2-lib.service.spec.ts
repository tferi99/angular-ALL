import { Test, TestingModule } from '@nestjs/testing';
import { MyAngDemo2LibService } from './my-ang-demo2-lib.service';

describe('MyAngDemo2LibService', () => {
  let service: MyAngDemo2LibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyAngDemo2LibService],
    }).compile();

    service = module.get<MyAngDemo2LibService>(MyAngDemo2LibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

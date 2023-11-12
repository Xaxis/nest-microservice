import { Module } from '@nestjs/common';
import { OrchestrationDataSourceService } from './orchestration.service';

@Module({
    providers: [OrchestrationDataSourceService],
    exports: [OrchestrationDataSourceService],
})
export class OrchestrationDataSourceModule {}
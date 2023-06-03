import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { BoardsController } from './boards/boards.controller';

@Module({
  imports: [BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

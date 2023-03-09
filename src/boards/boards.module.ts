import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CustomOrmModule } from '../config/custom-orm.module';
import { BoardRepository } from './repo/board.repository';
import { BoardsService } from './service/boards.service';
import { BoardsController } from './controller/boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), CustomOrmModule.forCustomRepository([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}

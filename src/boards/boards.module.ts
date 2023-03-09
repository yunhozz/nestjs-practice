import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardOrmModule } from './repo/board-orm.module';
import { BoardRepository } from './repo/board.repository';
import { BoardsService } from './service/boards.service';
import { BoardsController } from './controller/boards.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [Board],
    }),
    BoardOrmModule.forCustomRepository([BoardRepository]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}

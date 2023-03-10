import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from '../repo/board.repository';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardStatus } from '../board-status.enum';
import { User } from '../../auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {} // DI repository

  async findBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return board;
  }

  async findAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async findMyBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    return query.getMany();
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.findBoardById(id);
    board.status = status;
    return await this.boardRepository.save(board);
  }

  async deleteBoardById(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete([id, user.id]);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log('result', result); // id 로 조회 실패시 'affected = 0' -> 예외 처리
  }
}

/*
동기: 특정한 작업이 종료된 후 다음 줄의 작업을 실행하는 것을 의미 (직렬)
비동기: 특정한 작업이 종료되기 까지 기다리는 것이 아니라 기다리지 않고 실행되는 것 (병렬)

js 에서는 대부분의 작업들이 특별한 처리를 해주지 않으면 자동적으로 비동기적으로 실행되는 부분들이 많다.
따라서, Promise 와 async/await 구문을 사용하여 처리한다.
 */

import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto'; // npm install uuid --save 명령어를 이용하여 설치 -> UUID import

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // local memory

  findAllBoards(): Board[] {
    return this.boards;
  }

  findBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  createBoardV1(title: string, description: string): Board {
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  createBoardV2(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.findBoardById(id);
    board.status = status;
    return board;
  }

  deleteBoardById(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}

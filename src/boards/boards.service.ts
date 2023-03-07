import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'; // npm install uuid --save 명령어를 이용하여 설치 -> UUID import

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // local memory

  findAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string): Board {
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}

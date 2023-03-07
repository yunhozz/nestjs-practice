import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = []; // local memory

  findAllBoards() {
    return this.boards;
  }
}

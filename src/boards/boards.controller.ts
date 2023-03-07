import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {} // DI 간단하게 하기

  @Get()
  getAllBoards() {
    return this.boardsService.findAllBoards();
  }
}

/*
<의존성 주입>
boardsService: BoardsService;

constructor(boardsService: BoardsService) {
  this.boardsService = boardsService;
}
 */

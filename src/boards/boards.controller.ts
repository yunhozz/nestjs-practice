import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {} // DI 간단하게 하기

  @Get()
  getAllBoards(): Board[] {
    return this.boardsService.findAllBoards();
  }

  @Post('/v1')
  createBoardV1(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Board {
    return this.boardsService.createBoardV1(title, description);
  }

  @Post('/v2')
  createBoardV2(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoardV2(createBoardDto);
  }
}

/*
<의존성 주입>
boardsService: BoardsService;

constructor(boardsService: BoardsService) {
  this.boardsService = boardsService;
}
 */

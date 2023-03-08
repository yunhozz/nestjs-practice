import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {} // DI 간단하게 하기

  @Get()
  getAllBoards(): Board[] {
    return this.boardsService.findAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.findBoardById(id);
  }

  @Post('/v1')
  createBoardV1(@Body('title') title: string, @Body('description') description: string): Board {
    return this.boardsService.createBoardV1(title, description);
  }

  @Post('/v2')
  @UsePipes(ValidationPipe) // handler level
  createBoardV2(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoardV2(createBoardDto);
  }

  @Patch('/:id')
  updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoardById(id);
  }
}

/*
<의존성 주입>
boardsService: BoardsService;

constructor(boardsService: BoardsService) {
  this.boardsService = boardsService;
}
 */

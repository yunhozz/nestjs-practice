import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsMemoryService } from '../service/boards-memory.service';
import { Board, BoardMemoryStatus } from '../board.model';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsMemoryController {
  constructor(private boardMemoryService: BoardsMemoryService) {} // DI 간단하게 하기

  @Get()
  getAllBoards(): Board[] {
    return this.boardMemoryService.findAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardMemoryService.findBoardById(id);
  }

  @Post('/v1')
  createBoardV1(@Body('title') title: string, @Body('description') description: string): Board {
    return this.boardMemoryService.createBoardV1(title, description);
  }

  @Post('/v2')
  @UsePipes(ValidationPipe) // handler level
  createBoardV2(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardMemoryService.createBoardV2(createBoardDto);
  }

  @Patch('/:id')
  updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardMemoryStatus): Board {
    return this.boardMemoryService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardMemoryService.deleteBoardById(id);
  }
}

/*
<의존성 주입>
boardsService: BoardsService;

constructor(boardsService: BoardsService) {
  this.boardsService = boardsService;
}
 */

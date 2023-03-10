import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardsService } from '../service/boards.service';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardStatus } from '../board-status.enum';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // auth module 설정 후 guard 적용
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.findBoardById(id);
  }

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.findAllBoards();
  }

  @Get('/mine')
  getMyBoards(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.findMyBoards(user);
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Patch('/:id')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.boardService.deleteBoardById(id, user);
  }
}

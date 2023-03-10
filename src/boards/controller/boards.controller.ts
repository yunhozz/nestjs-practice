import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
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
  private logger = new Logger('BoardsController');

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
    this.logger.verbose(`User ${user.username} is trying to get all boards`);
    return this.boardService.findMyBoards(user);
  }

  @Post()
  createBoard(@Body(ValidationPipe) createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    this.logger.verbose(`User ${user.username} is creating new board. Payload: ${JSON.stringify(createBoardDto)}`);
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

/*
<로깅 (logging)>
로그 레벨 지정: log, error, warn, debug, verbose

Log - 중요한 정보의 범용 로깅
Warning - 치명적이거나 파괴적이지 않은 처리되지 않은 문제
Error - 치명적이거나 파괴적인 처리되지 않은 문제
Debug - 오류 발생시 로직을 디버그하는데 도움이 되는 유용한 정보. 개발자용
Verbose - 응용 프로그램의 동작에 대한 통찰력을 제공하는 정보입니다. 운영자용
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardMemoryStatus } from '../board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from '../dto/create-board.dto';

@Injectable()
export class BoardsMemoryService {
  private boards: Board[] = []; // local memory

  findAllBoards(): Board[] {
    return this.boards;
  }

  findBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return board;
  }

  createBoardV1(title: string, description: string): Board {
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardMemoryStatus.PUBLIC,
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
      status: BoardMemoryStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: string, status: BoardMemoryStatus): Board {
    const board = this.findBoardById(id);
    board.status = status;
    return board;
  }

  deleteBoardById(id: string): void {
    const found = this.findBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }
}

/*
<PIPE 란?>
1. @Injectable() 데코레이터로 주석이 달린 클래스
2. data transformation 과 data validation 을 위해 사용
3. 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동

data transformation: 입력 데이터를 원하는 형식으로 변환 ex) String to Integer
data validation: 입력 데이터를 평가하고 유효하지 않은 경우 예외를 발생시킴

<PIPE 를 사용하는 방법>
1. Handler-level Pipes: @UsePipes() 데코레이터를 이용해서 사용, 모든 파라미터에 적용
2. Parameter-level Pipes: 특정한 파라미터에만 적용
3. Global-level Pipes: 애플리케이션 레벨의 파이프, 클라이언트에서 들어오는 모든 요청에 적용, main.ts 에 적용

<기본적으로 사용할 수 있는 PIPE>
ValidationPipe, ParseIntPipe, ParseBoolPipe, ParseArrayPipe, ParseUUIDPipe, DefaultValuePipe
 */

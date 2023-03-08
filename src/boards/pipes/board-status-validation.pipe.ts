import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    console.log('value', value);
    console.log('metadata', metadata);
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}

/*
value: 처리가 된 인자의 값
metadata: 인자에 대한 메타 데이터를 포함한 객체

transform() 메소드에서 return 된 값은 Route 핸들러로 전해진다.
만약, 예외가 발생하면 클라이언트에 바로 전해진다.
 */

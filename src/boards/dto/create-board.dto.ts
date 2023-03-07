export class CreateBoardDto {
  title: string;
  description: string;
}

/*
클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용함
따라서, DTO 는 클래스를 이용하여 작성
 */

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

// model 에는 class 와 interface 둘 다 사용할 수 있으나, 변수의 타입만을 정의하기 위해 interface 사용

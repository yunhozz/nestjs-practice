export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardMemoryStatus;
}

export enum BoardMemoryStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

// local memory 를 위한 interface

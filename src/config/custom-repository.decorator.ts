import { SetMetadata } from '@nestjs/common';

export const BOARD_CUSTOM_REPOSITORY = 'BOARD_CUSTOM_REPOSITORY';

export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(BOARD_CUSTOM_REPOSITORY, entity);
}

import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { InMemoryRoomRepository } from './repo/in-memory/room.repository.impl';
import { RoomRepository } from './repo/room.repository';

@Module({
  providers: [RoomService, {
    provide: RoomRepository,
    useClass: InMemoryRoomRepository,
  }],
  exports: [RoomService],
})
export class RoomModule {}

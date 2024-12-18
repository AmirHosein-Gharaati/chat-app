import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [RoomModule],
  providers: [MessageService],
})
export class MessageModule {}

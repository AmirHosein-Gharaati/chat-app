import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from '../message/message.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [MessageModule, RoomModule],
  providers: [ChatGateway],
})
export class ChatModule {}

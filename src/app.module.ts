import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { RoomModule } from './modules/room/room.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [ChatModule, RoomModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

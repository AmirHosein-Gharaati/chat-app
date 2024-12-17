import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [ChatModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

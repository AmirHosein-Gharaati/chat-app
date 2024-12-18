import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { RoomModule } from '../room/room.module';
import { MessageRepository } from './repo/message.repository';
import { InMemoryMessageRepository } from './repo/in-memory/message.repository.impl';
import { MessageController } from './message.controller';

@Module({
  imports: [RoomModule],
  exports: [MessageService],
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: MessageRepository,
      useClass: InMemoryMessageRepository,
    },
  ],
})
export class MessageModule {}

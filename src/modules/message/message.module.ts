import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { RoomModule } from '../room/room.module';
import { MessageRepository } from './repo/message.repository';
import { InMemoryMessageRepository } from './repo/in-memory/message.repository.impl';

@Module({
  imports: [RoomModule],
  providers: [
    MessageService,
    {
      provide: MessageRepository,
      useClass: InMemoryMessageRepository,
    },
  ],
})
export class MessageModule {}

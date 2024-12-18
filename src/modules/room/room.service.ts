import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './room.entity';
import { RoomRepository } from './repo/room.repository';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  create(name: string) {
    const room = new Room(name);
    return this.roomRepository.save(room)
  }

  async addParticipant(roomId: string, userId: string) {
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new NotFoundException(`room does not exist with id=${roomId}`);
    }

    room.participants.push(userId);
    return this.roomRepository.update(room);
  }

  async participantExists(roomId: string, userId: string) {
    const room = await this.roomRepository.findById(roomId);
    
    if (!room) {
      throw new NotFoundException(`room does not exist with id=${roomId}`);
    }

    return room.participants.includes(userId);
  }

  existsById(roomId: string) {
    return this.roomRepository.existsById(roomId);
  }
}

import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  rooms: Room[] = [];

  constructor() {}

  create(name: string) {
    const id = (this.rooms.length + 1).toString();
    const room = new Room(id, name);

    this.rooms.push(room);

    return room;
  }

  addParticipant(roomId: string, userId: string) {
    const room = this.rooms.filter((room) => room.id === roomId);
    if (room.length === 0) {
      throw Error(`roomId ${roomId} does not exist`);
    }

    room[0].participants.push(userId);
  }
}

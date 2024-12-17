import { Test } from '@nestjs/testing';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let roomService: RoomService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RoomService],
    }).compile();

    roomService = moduleRef.get(RoomService);
  });

  it('should add participant to a room', () => {
    const userId = '1';
    const room = roomService.create('Test room');

    roomService.addParticipant(room.id, userId);

    const createdRoom = roomService.rooms.filter((r) => r.id === room.id)[0];

    expect(createdRoom.participants.length).toBe(1);
    expect(createdRoom.participants[0]).toBe(userId);
  });

  it('should raise an error when giving a room id which does not exist', () => {
    const userId = '1';
    const roomId = 'test-room-id';

    expect(() => roomService.addParticipant(roomId, userId)).toThrow(
      `roomId ${roomId} does not exist`,
    );
  });
});

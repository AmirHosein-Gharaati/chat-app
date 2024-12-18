import { Room } from "../../room.entity";
import { RoomRepository } from "../room.repository";


export class InMemoryRoomRepository implements RoomRepository {
    private readonly rooms: Room[] = [];
    private sequenceNumber: number = 0;

    save(room: Room): Promise<Room> {
        const id = this.sequenceNumber.toString();
        this.sequenceNumber++;
        
        room.id = id;
        this.rooms.push(room);
        return Promise.resolve(room);
    }

    update(room: Room): Promise<Room> {
        const index = this.rooms.findIndex(r => r.id === room.id);
        this.rooms[index] = room;
        return Promise.resolve(room);
    }

    findById(id: string): Promise<Room | null> {
        return Promise.resolve(this.rooms.find(room => room.id === id) || null);
    }

    existsById(id: string): Promise<boolean> {
        return Promise.resolve(this.rooms.some(room => room.id === id));
    }
}

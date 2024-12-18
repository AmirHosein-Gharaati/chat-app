import { Room } from "../room.entity";


export abstract class RoomRepository {
    abstract save(room: Room): Promise<Room>;
    abstract findById(id: string): Promise<Room | null>;
    abstract existsById(id: string): Promise<boolean>;
    abstract update(room: Room): Promise<Room>;
}

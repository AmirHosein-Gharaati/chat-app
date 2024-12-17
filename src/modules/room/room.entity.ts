export class Room {
  id: string;
  name: string;
  participants: string[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.participants = [];
  }
}

export class Room {
  id: string;
  name: string;
  participants: string[];

  constructor(name: string) {
    this.name = name;
    this.participants = [];
  }
}

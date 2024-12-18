export class Message {
  id: string;
  text: string;
  creator: string;
  room: string;
  createdAt: Date;

  constructor(id: string, text: string, creator: string, room: string) {
    this.id = id;
    this.text = text;
    this.creator = creator;
    this.room = room;
    this.createdAt = new Date();
  }
}

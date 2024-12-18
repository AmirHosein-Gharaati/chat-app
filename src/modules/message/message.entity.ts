export class Message {
  id: string;
  text: string;
  creator: string;
  room: string;
  createdAt: Date;

  constructor(text: string, creator: string, room: string) {
    this.text = text;
    this.creator = creator;
    this.room = room;
    this.createdAt = new Date();
  }
}

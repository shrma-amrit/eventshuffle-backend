import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  dates: string[];
  votes: {
    date: string;
    people: string[];
  }[];
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  dates: { type: [String], required: true },
  votes: [
    {
      date: { type: String, required: true },
      people: { type: [String], required: true },
    },
  ],
});

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;

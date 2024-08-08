import { Request, ResponseToolkit } from "@hapi/hapi";
import Event, { IEvent } from "../models/eventModel";
import { handleError } from "../utils/utils";

export const listEvents = async (request: Request, h: ResponseToolkit) => {
  try {
    const events = await Event.find().select("id name");
    return h.response({ events }).code(200);
  } catch (err) {
    return h.response({ error: handleError(err) }).code(500);
  }
};

export const createEvent = async (request: Request, h: ResponseToolkit) => {
  const { name, dates } = request.payload as IEvent;
  try {
    const newEvent = new Event({ name, dates, votes: [] });
    const savedEvent = await newEvent.save();
    return h.response({ id: savedEvent.id }).code(201);
  } catch (err) {
    return h.response({ error: handleError(err) }).code(500);
  }
};

export const showEvent = async (request: Request, h: ResponseToolkit) => {
  try {
    const event = await Event.findById(request.params.id);
    if (!event) return h.response({ error: "Event not found" }).code(404);
    return h.response(event).code(200);
  } catch (err) {
    return h.response({ error: handleError(err) }).code(500);
  }
};

export const addVote = async (request: Request, h: ResponseToolkit) => {
  const { name, votes } = request.payload as { name: string; votes: string[] };
  try {
    const event = await Event.findById(request.params.id);
    if (!event) return h.response({ error: "Event not found" }).code(404);

    votes.forEach((vote) => {
      const voteEntry = event.votes.find((v) => v.date === vote);
      if (voteEntry) {
        voteEntry.people.push(name);
      } else {
        event.votes.push({ date: vote, people: [name] });
      }
    });

    const updatedEvent = await event.save();
    return h.response(updatedEvent).code(200);
  } catch (err) {
    return h.response({ error: handleError(err) }).code(500);
  }
};

export const showResults = async (request: Request, h: ResponseToolkit) => {
  try {
    const event = await Event.findById(request.params.id);
    if (!event) return h.response({ error: "Event not found" }).code(404);

    const suitableDates = event.dates.map((date) => ({
      date,
      people: event.votes
        .filter((vote) => vote.date === date)
        .flatMap((vote) => vote.people),
    }));

    return h
      .response({ id: event.id, name: event.name, suitableDates })
      .code(200);
  } catch (err) {
    return h.response({ error: handleError(err) }).code(500);
  }
};

import { ServerRoute } from "@hapi/hapi";
import {
  listEvents,
  createEvent,
  showEvent,
  addVote,
  showResults,
} from "../controllers/eventController";

const eventRoutes: ServerRoute[] = [
  {
    method: "GET",
    path: "/api/v1/event/list",
    handler: listEvents,
  },
  {
    method: "POST",
    path: "/api/v1/event",
    handler: createEvent,
  },
  {
    method: "GET",
    path: "/api/v1/event/{id}",
    handler: showEvent,
  },
  {
    method: "POST",
    path: "/api/v1/event/{id}/vote",
    handler: addVote,
  },
  {
    method: "GET",
    path: "/api/v1/event/{id}/results",
    handler: showResults,
  },
];

export default eventRoutes;

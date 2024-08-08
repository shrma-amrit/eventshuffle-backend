import Hapi from "@hapi/hapi";
import eventRoutes from "./routes/eventRoutes";
import dotenv from "dotenv";
import connectDB from "./utils/database";
import fs from "fs";
import path from "path";

dotenv.config();

const init = async () => {
  await connectDB();

  const server = Hapi.server({
    port: Number(process.env.PORT) || 3000,
    host: "localhost",
    tls: {
      key: fs.readFileSync("/Users/ayud/key.pem"),
      cert: fs.readFileSync("/Users/ayud/cert.pem"),
    },
  });

  server.route(eventRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

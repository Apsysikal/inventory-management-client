import express from "express";
import { Server } from "./server";

const app = express();
const port = Number(process.env.PORT) || 3000;

const server = new Server(app);

server.start(port);

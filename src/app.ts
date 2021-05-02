import express from "express";
import clientsRouter from "./main/router/client-router";

const app = express();
app.use(express.json());

app.use("/clients", clientsRouter);

export default app;

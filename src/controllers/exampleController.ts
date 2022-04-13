import { Request, Response } from "express";
import exampleService from "../services/exampleService";

async function get(req: Request, res: Response) {
  const name = req.query["name"]?.toString() ?? "User";
  const message = exampleService.createHelloWorld(name);
  res.status(200).send(message);
}

export default { get };

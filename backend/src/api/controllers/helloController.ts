import { Request, Response } from "express";

interface HelloResponse {
  data: string;
}

export function getHello(req: Request, res: Response<HelloResponse>) {
  res.status(200).send({ data: "hello from nodejs!" });
}

import jwt from "jsonwebtoken";
import { Request as ExpressRequest, Response, NextFunction } from "express";

interface UserPayload {
  userId: number;
}

export interface Request extends ExpressRequest {
  user?: UserPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = decoded as UserPayload;
      console.log("req.user", req.user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

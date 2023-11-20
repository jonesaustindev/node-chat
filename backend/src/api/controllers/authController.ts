import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "../../db/db";
import { sanitizeString } from "../../utils/stringUtils";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const sanitizedUsername = sanitizeString(username);

    const userCheckQuery = "SELECT * FROM users WHERE username = $1";
    const userCheckResult = await pool.query(userCheckQuery, [
      sanitizedUsername,
    ]);

    if (userCheckResult.rows.length > 0) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [sanitizedUsername, hashedPassword]
    );

    const token = jwt.sign({ userId: result?.rows[0]?.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .json({ data: { token, user: { username: result?.rows[0]?.username } } });
  } catch (error) {
    console.error("Sign up error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const sanitizedUsername = sanitizeString(username);

    const result = await pool.query(
      "SELECT id, password, username FROM users WHERE username = $1",
      [sanitizedUsername]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.status(201).json({ token, user: { username: user.username } });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

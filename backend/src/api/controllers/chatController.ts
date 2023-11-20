import { Request, Response } from "express";

import pool from "../../db/db";

export const getChatMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query(
      "SELECT messages.id, messages.message, messages.created_at, users.username FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY messages.created_at ASC LIMIT 50"
    );

    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Get chat messages error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

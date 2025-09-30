import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { sendSuccess, sendError } from "../utils/response";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    return sendSuccess(res, "User registered successfully", user, 201);
  } catch (err: any) {
    return sendError(res, err.message);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    return sendSuccess(res, "Login successful", result);
  } catch (err: any) {
    return sendError(res, err.message);
  }
}

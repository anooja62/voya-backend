import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const hashed = await hashPassword(password);
  const user = await User.create({ username, email, password: hashed });

  return { id: user._id, username: user.username, email: user.email };
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not Found");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id.toString());
  return {
    token,
    user: { id: user._id, username: user.username, email: user.email },
  };
}

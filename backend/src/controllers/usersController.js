import { getAllUsers } from "../models/usersModel.js";

export async function listUsers(req, res) {
  const users = await getAllUsers();

  res.status(200).json(users);
}
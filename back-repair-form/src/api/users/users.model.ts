import * as z from "zod";
import { db } from "../../db";
import { WithId } from "mongodb";

export const User = z.object({
  email: z.string().email(),
  password: z.string().min(8)});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;

export const Users = db.collection<User>("users");

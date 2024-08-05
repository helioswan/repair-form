import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Users } from "./users.model";
import { TokenResponse } from "../../interfaces/TokenResponse";
import MessageResponse from "../../interfaces/MessageResponse";

export async function login(
    req: Request,
    res: Response<TokenResponse>,
    next: NextFunction
  ) {
    try {
        const {email,  password } = req.body;

        const user = await Users.findOne({
          email: email
        });
        if (!user) {
            res.status(401);
            throw new Error('Invalid username or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(401);
          throw new Error('Invalid username or password');
        }
        const secret = process.env.SECRET_KEY as string;
        const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

export async function register(
    req: Request<Record<string, never>, MessageResponse, User>,
    res: Response<MessageResponse>,
    next: NextFunction
  ) {
    try {
        const { email, password } = req.body;

        const userExists = await Users.findOne({
            email: email
        });
        if (userExists) {
          res.status(409);
          throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: User = { email, password: hashedPassword };
        const insertedUser = await Users.insertOne(newUser);
        if(!insertedUser.acknowledged) {
            res.status(500);
            throw new Error("Failed to insert user");
        }
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error);
    }
  }
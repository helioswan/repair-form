import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import jwt from 'jsonwebtoken';
import ErrorResponse from "./interfaces/ErrorResponse";
import type RequestValidators from "./interfaces/RequestValidators";


export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const errStatus = res.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
      message: errMsg,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
}

export function requestValidator(validator: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validator.query) {
        req.query = await validator.query.parseAsync(req.query);
      }
      if (validator.body) {
        req.body = await validator.body.parseAsync(req.body);
      }
      if (validator.params) {
        req.params = await validator.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError)
        res.status(422).json({ message: error.errors });
    }
  };
}

export function verifyToken(req: Request, res: Response, next: NextFunction ) {
  try {
    const authHeader = req.headers.authorization;
    const secret = process.env.SECRET_KEY as string;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};
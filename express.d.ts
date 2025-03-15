import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId: number; // or the appropriate type you expect
      token?: string; // or the appropriate type you expect
    }
  }
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  //   ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJhc0BleGFtcGxlLmNvbSIsInVzZXJJZCI6NCwiaWF0IjoxNzQyMDMxMDkxLCJleHAiOjIwMDEyMzEwOTF9.Wa9ZIgYVSr7CZK_Ui61-hbaqBgSkwhaHiya2Uv7tJr4"); // Bearer <token>

  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null)
    return res.status(401).json({
      status: 401,
      message: "You are not authenticated",
    }); // No token present
  const secret = process.env.JWT_KEY;
  if (secret) {
    jwt.verify(token, secret, (err, payload) => {
      if (err)
        return res.status(403).json({
          status: 403,
          message: "Token is not valid!",
        }); // Invalid token
      if (payload && typeof payload === "object" && "userId" in payload) {
        req.userId = payload?.userId;

        next();
      }
      req.token = token;
    });
  } else {
    return res.status(500).json({
      status: 500,
      message: "Server configuration error: JWT secret not provided",
    });
  }
};

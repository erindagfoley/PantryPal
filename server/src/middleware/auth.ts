import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ✅ Define the structure of the JWT payload
export interface JwtPayload {
  id: number;
  username: string;
}

// ✅ Extend Express Request to include `user`
export interface AuthRequest extends Request {
  user?: JwtPayload; // ✅ `user` is optional but when present, must contain `id`
}

// ✅ Fix `authenticateToken` to ensure `req.user` has correct types
export const authenticateToken = (
  req: Request, // ✅ Keep it `Request` initially
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secretKey = process.env.JWT_SECRET || "";

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err || !decoded) {
      res.status(403).json({ message: "Forbidden: Invalid token" });
      return;
    }

    // ✅ Ensure decoded has required properties
    const payload = decoded as JwtPayload;
    if (!payload.id || !payload.username) {
      res.status(403).json({ message: "Forbidden: Invalid token payload" });
      return;
    }

    // ✅ Use type assertion to make `req` an `AuthRequest`
    (req as AuthRequest).user = payload;

    next();
  });
};


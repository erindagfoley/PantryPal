import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// ✅ Extend Express Request to include 'user'
interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Access denied, no token provided" });
      return; // ✅ Ensure function stops execution
    }

    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user as JwtPayload; // ✅ TypeScript now knows req.user exists

    return next(); // ✅ Ensure function always returns
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return; // ✅ Prevent missing return path error
  }
};

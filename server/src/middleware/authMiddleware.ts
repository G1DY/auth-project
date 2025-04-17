import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtToken";
import User, { IUser } from "../models/user";

export interface AuthRequest extends Request {
  user?: IUser | null;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
    return; // ❗This fixes the TS error
  }

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    next(); // ✅ All good, move on
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not Authorized to access this route",
    });
  }
};

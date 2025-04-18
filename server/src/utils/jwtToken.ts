import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import ms from "ms";

dotenv.config();

interface TokenPayload {
  id: String;
}
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const JWT_EXPIRE: any = process.env.JWT_EXPIRE || "30d";

const generateToken = (id: string): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRE,
  };

  return jwt.sign({ id }, JWT_SECRET, options);
};

const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

export { generateToken, verifyToken, TokenPayload };

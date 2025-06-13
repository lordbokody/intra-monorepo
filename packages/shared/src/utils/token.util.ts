import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from 'dotenv';
import {RegistrationStatus} from "../types/user.types";

dotenv.config();

export const generateEmailConfirmationToken = (userID: number): string => {
  return jwt.sign({ userID }, process.env.JWT_SECRET as string, { expiresIn: "24h" });
}

export const verifyToken = (token: string): number | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return decoded.userID
  } catch (error) {
    throw null
  }
};

export const generateLoginToken = (userID: number, email: string, role: string, registrationStatus: RegistrationStatus): string => {
  return jwt.sign({ userID, email, role, registrationStatus }, process.env.JWT_SECRET as string, { expiresIn: "365d" })
}

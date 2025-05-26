import { APIError, Gateway } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {Header} from "encore.dev/api";
import {AuthData} from "@intra/shared/types/auth.types";

export interface AuthParams {
    authorization: Header<"Authorization">;
}

dotenv.config()

export const auth = authHandler<AuthParams, AuthData>(
    async (params) => {
        const token = params.authorization.replace("Bearer ", "");

        if (!token) {
            throw APIError.unauthenticated("No token provided!");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        if (!decoded) {
            throw APIError.unauthenticated("Invalid token payload!");
        }

        if (!decoded.userID) {
            throw APIError.unauthenticated("Invalid token: Missing userID!");
        }

        return {
            userID: String(decoded.userID),
            email: decoded.email,
            role: decoded.role,
            registrationStatus: decoded.registrationStatus
        };
    }
)

export const gateway = new Gateway({
    authHandler: auth,
})
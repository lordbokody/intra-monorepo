import { APIError, Gateway } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {Header} from "encore.dev/api";
import {AuthData} from "@intra/shared/types/auth.types";

// Betöltjük az env file-t
dotenv.config()

/**
 * Auth paraméterek interface
 */
export interface AuthParams {
    authorization: Header<"Authorization">;
}

/**
 * Auth handler
 */
export const auth = authHandler<AuthParams, AuthData>(
    async (params) => {
        // Betöltjük a tokent
        const token = params.authorization.replace("Bearer ", "");

        // Ha nincs token, akkor hibát dobunk
        if (!token) {
            throw APIError.unauthenticated("No token provided!");
        }

        // Visszafejtjük a tokent
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        // Ha visszafejtés után nincs semmi, akkor hibát dobunk
        if (!decoded) {
            throw APIError.unauthenticated("Invalid token payload!");
        }

        // Ha nincs userID a visszafejtett tokenben, akkor hibát dobunk
        if (!decoded.userID) {
            throw APIError.unauthenticated("Invalid token: Missing userID!");
        }

        // Visszatérünk a tokenből kinyert adatokkal
        return {
            userID: String(decoded.userID),
            email: decoded.email,
            role: decoded.role,
            registrationStatus: decoded.registrationStatus
        };
    }
)

/**
 * Auth gateway
 */
export const gateway = new Gateway({
    authHandler: auth,
})
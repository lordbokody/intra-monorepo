import {VerifyTokenDto, VerifyTokenResponse} from "@intra/shared/types/auth.types";
import {APIError} from "encore.dev/api";
import {verifyToken} from "@intra/shared/utils/token.util";
import {verifyTokenSchema} from "@intra/shared/schemas/auth/verifyToken.schema";

/**
 * Token vizsgálata, hogy érvényes e még, vagy sem
 */
export const verifyTokenMethod = async (data: VerifyTokenDto): Promise<VerifyTokenResponse> => {
    try {
        // Validáljuk a kliens oldali adatokat
        await verifyTokenSchema('hu').client().validate(data);

        // Ellenőrizzük a tokent
        verifyToken(data.token);

        // Visszatérünk a helyes válasszal
        return {
            success: true,
        };
    } catch (error: any) {
        // Visszatérünk, ha a token lejárt
        if(error.message === 'jwt expired'){
            return {
                success: false,
            };
        }

        // Egyéb hibák
        throw APIError.aborted(error as string);
    }
};
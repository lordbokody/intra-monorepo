import {VerifyTokenDto, VerifyTokenResponse} from "@intra/shared/types/auth.types";
import {APIError, Header} from "encore.dev/api";
import {verifyToken} from "@intra/shared/utils/token.util";
import {verifyTokenSchema} from "@intra/shared/schemas/auth/verifyToken.schema";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface VerifyTokenParams extends VerifyTokenDto {
    locale: Header<"Accept-Language">;
}

/**
 * Token vizsgálata, hogy érvényes e még, vagy sem
 */
export const verifyTokenMethod = async (data: VerifyTokenParams): Promise<VerifyTokenResponse> => {
    try {
        // Létrehozzuk a validáló sémát
        const validationSchema = verifyTokenSchema(data.locale as ApplicationLanguage)

        // Validáljuk a kliens oldali adatokat
        await validationSchema.client().validate(data);

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
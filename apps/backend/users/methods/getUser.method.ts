import {getAuthData} from "~encore/auth";
import {prisma} from "../../database/prisma/database";
import {APIError} from "encore.dev/api";
import {GetUserDto, GetUserResponse} from "@intra/shared/types/user.types";
import {getUserSchema} from "@intra/shared/schemas/user/getUser.schema";

/**
 * Adott felhasználó adatainak lekérésére szolgáló metódus.
 */
export const getUserMethod = async (data: GetUserDto): Promise<GetUserResponse> => {
    try {
        await getUserSchema('hu').validate(data);

        const role = getAuthData()?.role;
        const registrationStatus = getAuthData()?.registrationStatus;

        if(registrationStatus !== 'registered'){
            return {
                success: false,
                message: "Nem véglegesített regisztráció!",
            };
        }

        if(role === 'unverified') {
            return {
                success: false,
                message: "Nincs véglegesített szerepköröd!",
            };
        }

        const user = await prisma.user.findFirst({
            where: { id: data.id },
            select: {
                id: true,
                name: true,
                email: true,
                birthday: true,
                registrationStatus: true,
                role: true,
            },
        });

        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }

        return {
            success: true,
            user: user,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
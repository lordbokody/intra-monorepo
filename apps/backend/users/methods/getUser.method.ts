import {getAuthData} from "~encore/auth";
import {prisma} from "../../database/prisma/database";
import {APIError} from "encore.dev/api";
import {GetUserDto, GetUserResponse, UserDto} from "@intra/shared/types/user.types";
import {getUserSchema} from "@intra/shared/schemas/user/getUser.schema";

/**
 * Adott felhasználó adatainak lekérésére szolgáló metódus.
 */
export const getUserMethod = async (data: GetUserDto): Promise<GetUserResponse> => {
    try {
        // Lekérjük az authentikációs adatokat
        const role = getAuthData()?.role;
        const registrationStatus = getAuthData()?.registrationStatus;

        // Validáljuk az authentikáció adatokat
        await getUserSchema('hu').auth().validate(true, {
            context: {
                registrationStatus: registrationStatus,
                role: role,
            },
        })

        // Validáljuk a kliens felől érkező adatokat
        await getUserSchema('hu').client().validate(data);

        // Lekérjük a felhasználót
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

        // Validáljuk a szerver oldali adatoakt
        await getUserSchema("hu").server().validate(user);

        // Visszatérünk a válasszal
        return {
            success: true,
            user: user as UserDto,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
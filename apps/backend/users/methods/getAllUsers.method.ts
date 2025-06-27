import {APIError, Header} from "encore.dev/api";
import {getOffset, paginatedData} from "@intra/shared/utils/pagination.util";
import {prisma} from "../../database/prisma/database";
import {getAuthData} from "~encore/auth";
import {UserDto, GetAllUsersDto, GetAllUsersResponse} from "@intra/shared/types/user.types";
import {getAllUsersSchema} from "@intra/shared/schemas/user/getAllUsers.schema";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface GetAllUsersParams extends GetAllUsersDto {
    locale: Header<"Accept-Language">;
}

/**
 * Összes felhasználó adatinak lekérésére szolgáló metódus.
 */
export const getAllUsersMethod = async (data: GetAllUsersParams): Promise<GetAllUsersResponse> => {
    try {
        // Lekérjük az authentikációs adatokat
        const role = getAuthData()?.role;

        // Létrehozzuk a validáló sémát
        const validationSchema = getAllUsersSchema(data.locale as ApplicationLanguage)

        // Validáljuk a szerver oldali adatokat
        await validationSchema.server().validate(true, {
            context: { role },
        });

        // Beállítjuk, hogy milyen adatokat szeretnénk lekérni az adatbázisból
        const select = {
            id: true,
            name: true,
            email: true,
            birthday: true,
            registrationStatus: true,
            role: true,
        };

        // Létrehozzuk a felhasználókat tároló tömböt
        let users: UserDto[] = [];

        // Létrehozzuk a paginációhoz szökséges változót
        let pagination: any = undefined;

        // Ha a kliensen definiáltuk, hogy hányadik oldalt kérjük és mekkora limittel, akkor kiszámítjuk
        if (data.page && data.limit) {
            const offset = getOffset(data.page, data.limit);
            const count = await prisma.user.count();
            users = await prisma.user.findMany({
                take: data.limit,
                skip: offset,
                select,
            });
            pagination = paginatedData({ size: data.limit, page: data.page, count });
        } else {
            // Ha nem adtunk meg bemeneti adatot visszaadjuk az összes felhasználót
            users = await prisma.user.findMany({
                select,
            });
        }

        // Visszatérünk a válasszal
        return {
            success: true,
            users,
            pagination,
        };
    } catch (error) {
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}

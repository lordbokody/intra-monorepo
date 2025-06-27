import {APIError, Header} from "encore.dev/api";
import {UpdateUserDto, UpdateUserResponse} from "@intra/shared/types/user.types";
import {getAuthData} from "~encore/auth";
import {updateUserSchema} from "@intra/shared/schemas/user/updateUser.schema";
import {prisma} from "../../database/prisma/database";
import {hashPassword} from "@intra/shared/utils/password.util";
import {checkEmailExists} from "../../utils/checkEmailExists.util";
import {ApplicationLanguage} from "@intra/shared/types/common.types";

/**
 * Kiegészítjük a Dto-t a Header nyelvi értékével
 */
export interface UpdateUserParams extends UpdateUserDto {
    locale: Header<"Accept-Language">;
}

/**
 * Adott felhasználó adatinak módosítása.
 */
export const updateUserMethod = async (data: UpdateUserParams): Promise<UpdateUserResponse> => {
    try {
        // Lekérjük az authentikációs adatokat
        const role = getAuthData()?.role;
        const id = Number(getAuthData()?.userID);

        // Létrehozzuk a validáló sémát
        const validationSchema = updateUserSchema(data.locale as ApplicationLanguage)

        // Validáljuk az authentikációs adatokat
        await validationSchema.auth().validate(data, { context: { role, id } });

        // Validáljuk a kliens felől érkező adatokat
        await validationSchema.client(checkEmailExists).validate(data);

        // Lekérjük a felhasználót az adatbázisból
        const user = await prisma.user.findFirst({ where: { id } });

        // Validáljuk a szerver oldali adatokat
        await validationSchema.server().validate(user);

        // Elkészítjük a frissítendő adatokat
        const updateData = {
            name: data.name || user?.name,
            password: data.password ? await hashPassword(data.password) : user?.password,
            email: data.email || user?.email,
            birthday: data.birthday || user?.birthday,
            role: data.role || user?.role
        };

        // Frissítjük az adatbázist
        const updated = await prisma.user.update({ data: updateData, where: { id: data.id } });

        // Visszatérünk a válasszal
        return {
            success: true,
            user: updated,
        };
    } catch (error){
        // Hibakezelés
        throw APIError.aborted(error as string);
    }
}
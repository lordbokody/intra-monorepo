import {APIError} from "encore.dev/api";
import {UpdateUserDto, UpdateUserResponse} from "@intra/shared/types/user.types";
import {getAuthData} from "~encore/auth";
import {updateUserSchema} from "./updateUser.schema";
import {prisma} from "../../../database/prisma/database";
import {hashPassword} from "../../../utils/password";

/**
 * Adott felhasználó adatinak módosítása.
 */
export const updateUserMethod = async (data: UpdateUserDto): Promise<UpdateUserResponse> => {
    try {
        const authRole = getAuthData()?.role;
        const authId = Number(getAuthData()?.userID);

        if(authRole !== 'admin' && authId !== data.id){
            return {
                success: false,
                message: "Csak a saját felhasználód adatait szerkesztheted!",
            };
        }

        if(authRole === 'admin' && authId !== data.id && data.password){
            return {
                success: false,
                message: "Csak a saját jelszavad módosíthatod!",
            };
        }

        if(authRole !== 'admin' && data.role){
          return {
            success: false,
            message: "Szerepkört csak admin módosíthat!",
          };
        }

        await updateUserSchema.validate(data);

        const user = await prisma.user.findFirst({ where: { id: data.id } });
        if (!user) {
            return {
                success: false,
                message: "Felhasználó nem található!",
            };
        }
        user.name = data.name || user.name;

        if(data.password){
            user.password = await hashPassword(data.password)
        }

        user.email = data.email || user.email;
        user.birthday = data.birthday || user.birthday;
        user.role = data.role || user.role;

        const updated = await prisma.user.update({ data: user, where: { id: data.id } });
        return {
            success: true,
            user: updated,
        };
    } catch (error){
        throw APIError.aborted(error as string);
    }
}
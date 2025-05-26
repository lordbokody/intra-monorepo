import {APIError} from "encore.dev/api";
import {getOffset, paginatedData} from "@intra/shared/utils/pagination.util";
import {prisma} from "../../../database/prisma/database";
import {getAuthData} from "~encore/auth";
import {UserDto, GetAllUsersDto, GetAllUsersResponse} from "@intra/shared/types/user.types";

/**
 * Összes felhasználó adatinak lekérésére szolgáló metódus.
 */
export const getAllUsersMethod = async (data: GetAllUsersDto): Promise<GetAllUsersResponse> => {
    try {
        const role = getAuthData()?.role;

        if (role !== 'admin') {
            return {
                success: false,
                message: "Nincs hozzáférésed!",
            };
        }

        let users: UserDto[] = [];
        let pagination: any = undefined;

        const select = {
            id: true,
            name: true,
            email: true,
            birthday: true,
            registrationStatus: true,
            role: true,
        };

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
            users = await prisma.user.findMany({
                select,
            });
        }

        return {
            success: true,
            users,
            pagination,
        };
    } catch (error) {
        throw APIError.aborted(error as string);
    }
}

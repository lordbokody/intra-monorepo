import { api } from "encore.dev/api";
import {
    FindOneByEmailResponse,
    GetUserResponse,
    GetAllUsersResponse,
    UpdateUserResponse,
    DeleteUserResponse
} from "@intra/shared/types/user.types";
import {findOneByEmailMethod, FindOneByEmailParams} from "./methods/findOneByEmail.method";
import {getUserMethod, GetUserParams} from "./methods/getUser.method";
import {getAllUsersMethod, GetAllUsersParams} from "./methods/getAllUsers.method";
import {updateUserMethod, UpdateUserParams} from "./methods/updateUser.method";
import {deleteUserMethod, DeleteUserParams} from "./methods/deleteUser.method";

/**
 * Felhasználó megkeresésére szolgáló metódus email cím alapján.
 */
export const findOneByEmail = api(
    // api paraméterek
    { expose: true, method: "GET", path: "/user/find/:email" },
    // api függvény
    async (data: FindOneByEmailParams): Promise<FindOneByEmailResponse> => {
        // Meghívjuk a metódust
        return await findOneByEmailMethod(data)
    }
)

/**
 * Adott felhasználó adatainak lekérésére szolgáló metódus.
 */
export const getUser = api(
    // api paraméterek
    { expose: true, auth: true, method: "GET", path: "/user/:id" },
    // api függvény
    async (data: GetUserParams): Promise<GetUserResponse> => {
        // Meghívjuk a metódust
        return await getUserMethod(data)
    }
)

/**
 * Összes felhasználó adatinak lekérésére szolgáló metódus.
 */
export const getAllUsers = api(
    // api paraméterek
    { expose: true, auth: true, method: "GET", path: "/user/all" },
    // api függvény
    async (data: GetAllUsersParams): Promise<GetAllUsersResponse> => {
        // Meghívjuk a metódust
        return await getAllUsersMethod(data)
    },
)

/**
 * Adott felhasználó adatinak módosítása
 */
export const updateUser = api(
    // api paraméterek
    { expose: true, auth: true, method: "PATCH", path: "/user/:id" },
    // api függvény
    async (data: UpdateUserParams): Promise<UpdateUserResponse> => {
        // Meghívjuk a metódust
        return await updateUserMethod(data)
    }
)

/**
 * Adott felhasználó adatinak módosítása
 */
export const deleteUser = api(
    // api paraméterek
    { expose: true, auth: true, method: "DELETE", path: "/user/:id" },
    // api függvény
    async (data: DeleteUserParams): Promise<DeleteUserResponse> => {
        // Meghívjuk a metódust
        return await deleteUserMethod(data)
    }
);

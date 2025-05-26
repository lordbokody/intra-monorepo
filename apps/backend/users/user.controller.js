import { api } from "encore.dev/api";
import UserService from "./user.service";
/**
 * Felhasználó megkeresésére szolgáló metódus email cím alapján.
 */
export const findOneByEmail = api({ expose: true, method: "GET", path: "/user/find/:email" }, async (data) => {
    return await UserService.findOneByEmail(data);
});
/**
 * Adott felhasználó adatainak lekérésére szolgáló metódus.
 */
export const getUser = api({ expose: true, auth: true, method: "GET", path: "/user/:id" }, async (data) => {
    return await UserService.getUser(data);
});
/**
 * Összes felhasználó adatinak lekérésére szolgáló metódus.
 */
export const getAllUsers = api({ expose: true, auth: true, method: "GET", path: "/user/all" }, async (data) => {
    return await UserService.getAllUsers(data);
});
/**
 * Adott felhasználó adatinak módosítása
 */
export const updateUser = api({ expose: true, auth: true, method: "PATCH", path: "/user/:id" }, async (data) => {
    return await UserService.updateUser(data);
});
/**
 * Adott felhasználó adatinak módosítása
 */
export const deleteUser = api({ expose: true, auth: true, method: "DELETE", path: "/user/:id" }, async (data) => {
    return await UserService.deleteUser(data);
});
//# sourceMappingURL=user.controller.js.map
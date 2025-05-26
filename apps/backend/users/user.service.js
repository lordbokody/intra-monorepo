// Methods
import { findOneByEmailMethod } from "./methods/findOneByEmail/findOneByEmail.method";
import { getUserMethod } from "./methods/getUser/getUser.method";
import { getAllUsersMethod } from "./methods/getAllUsers/getAllUsers.method";
import { updateUserMethod } from "./methods/updateUser/updateUser.method";
import { deleteUserMethod } from "./methods/deleteUser/deleteUser.method";
const UserService = {
    /**
     * Felhasználó megkeresésére szolgáló service email cím alapján.
     */
    findOneByEmail: async (data) => {
        return await findOneByEmailMethod(data);
    },
    /**
     * Adott felhasználó adatainak lekérésére szolgáló service.
     */
    getUser: async (data) => {
        return await getUserMethod(data);
    },
    /**
     * Összes felhasználó adatinak lekérésére szolgáló service.
     */
    getAllUsers: async (data) => {
        return await getAllUsersMethod(data);
    },
    /**
     * Adott felhasználó adatinak módosítása.
     */
    updateUser: async (data) => {
        return await updateUserMethod(data);
    },
    /**
     * Adott felhasználó adatinak módosítása
     */
    deleteUser: async (data) => {
        return await deleteUserMethod(data);
    }
};
export default UserService;
//# sourceMappingURL=user.service.js.map
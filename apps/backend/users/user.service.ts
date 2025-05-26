// Types
import {
  FindOneByEmailDto,
  FindOneByEmailResponse,
  GetUserDto,
  GetUserResponse,
  GetAllUsersDto,
  GetAllUsersResponse,
  UpdateUserDto,
  UpdateUserResponse,
  DeleteUserDto,
  DeleteUserResponse
} from "@intra/shared/types/user.types";

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
  findOneByEmail: async (data: FindOneByEmailDto): Promise<FindOneByEmailResponse> => {
    return await findOneByEmailMethod(data)
  },

  /**
   * Adott felhasználó adatainak lekérésére szolgáló service.
   */
  getUser: async (data: GetUserDto): Promise<GetUserResponse> => {
    return await getUserMethod(data)
  },

  /**
   * Összes felhasználó adatinak lekérésére szolgáló service.
   */
  getAllUsers: async (data: GetAllUsersDto): Promise<GetAllUsersResponse> => {
    return await getAllUsersMethod(data)
  },

  /**
   * Adott felhasználó adatinak módosítása.
   */
  updateUser: async (data: UpdateUserDto): Promise<UpdateUserResponse> => {
    return await updateUserMethod(data)
  },

  /**
   * Adott felhasználó adatinak módosítása
   */
  deleteUser: async (data: DeleteUserDto): Promise<DeleteUserResponse> => {
    return await deleteUserMethod(data)
  }
};

export default UserService;

import UserService from "../users/user.service";

export const checkEmailExists = async (email: string) => {
    if (!email) return true;
    const userByEmail = await UserService.findOneByEmail({email});
    return !userByEmail?.success;
}
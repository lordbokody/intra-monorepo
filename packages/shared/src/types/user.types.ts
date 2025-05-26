import {Paginated} from "./common.types";

export interface UserDto {
    /** Felhasználó id-ja */
    id: number;
    /** Felhasználó neve */
    name: string;
    /** Felhasználó email címe */
    email: string;
    /** Felhasználó születésnapja */
    birthday: string | null;
    /** Regisztráció státusza */
    registrationStatus: RegistrationStatus;
    /** Felhasználó szerepköre */
    role: Role;
}

export type RegistrationStatus = 'emailNotConfirmed' | 'partialRegistration' | 'registered';

export type Role = 'unverified' | 'student' | 'admin';

export interface DeleteUserDto {
    /** Felhasználó id-ja */
    id: number;
}

export interface DeleteUserResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
}

export interface FindOneByEmailDto {
    /** Keresett felhasználó email címe */
    email: string;
}

export interface FindOneByEmailResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
}

export interface GetAllUsersDto {
    /** Hányadik oldal */
    page?: number;
    /** Oldalanként hány elem */
    limit?: number;
}

export interface GetAllUsersResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
    /** Felhasználó adatai */
    users?: UserDto[]
    /** Lapozáshoz köthető adatok */
    pagination?: Paginated;
}

export interface GetUserDto {
    /** Felhasználó id-ja */
    id: number;
}

export interface GetUserResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
    /** Felhasználó adatai */
    user?: UserDto
}

export interface UpdateUserDto {
    /** Felhasználó id-ja */
    id: number;
    /** Felhasználó neve */
    name?: string;
    /** Felhasználó email címe */
    email?: string;
    /** Felhasználó jelszava */
    password?: string;
    /** Felhasználó születésnapja */
    birthday?: string | null;
    /** Felhasználó szerepköre */
    role?: Role;
}

export interface UpdateUserResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
    /** Felhasználó adatai */
    user?: UserDto
}
import {UserDto} from "./user.types";

export interface AuthData {
    userID: string;
    email: string;
    role: string;
    registrationStatus: string;
}

export interface FinishRegistrationDto {
    /** Felhasználó neve */
    name?: string;
    /** Felhasználó jelszava */
    password: string;
    /** Felhasználó email címe */
    email?: string;
    /** Felhasználó születésnapja */
    birthday: string;
}

export interface FinishRegistrationResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
    /** Felhasználó adatai */
    user?: UserDto;
    /** Felhasználó token */
    token?: string;
}

export interface ForgotPasswordChangeDto {
    /** Új jelszó */
    password: string;
    /** Jelszó helyreállítási token */
    token: string;
}

export interface ForgotPasswordChangeResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
}

export interface ForgotPasswordRequestDto {
    /** Felhasználó email címe */
    email: string;
}

export interface ForgotPasswordRequestResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
}

export interface LoginDto {
    /** Felhasználó email címe */
    email: string;
    /** Felhasználó jelszava*/
    password: string;
}

export interface LoginResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
    /** Token */
    token?: string;
    /** Felhasználó adatai */
    user?: UserDto
}

export interface LoginOAuthDto {
    /** Felhasználó neve */
    name: string;
    /** Felhasználó email címe */
    email: string;

}

export interface LoginOAuthResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
    /** Regisztráció státusza*/
    registrationStatus?: 'partialRegistration' | 'registered' | 'emailNotConfirmed';
    /** Token */
    token?: string;
    /** Szerepkör */
    role?: 'unverified' | 'student' | 'admin';
}

export interface RegisterDto {
    /** Felhasználó neve */
    name: string;
    /** Felhasználó jelszava */
    password: string;
    /** Felhasználó email címe */
    email: string;
    /** Felhasználó születésnapja */
    birthday: string;
}

export interface RegisterResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
}

export interface ReVerifyEmailDto {
    /** A felhasználó email címe amire újra ki kell küldeni a megerősítő emailt */
    email: string;
}

export interface ReVerifyEmailResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
}

export interface VerifyEmailDto {
    /** A megerősítő email tokenje */
    token: string;
}

export interface VerifyEmailResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
    /** Hibaüzenet sikertelen metódus esetén */
    message?: string;
}

export type VerifyEmailStatus = 'loading' | 'success' | 'confirmed' | 'error';
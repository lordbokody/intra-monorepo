export interface SendForgotPasswordEmailDto {
    /** Címzett neve */
    name: string;
    /** Címzett email címe */
    email: string;
    /** Email megerősítő token */
    token: string;
}
export interface SendForgotPasswordEmailResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
}
export interface SendRegisterEmailDto {
    /** Címzett neve */
    name: string;
    /** Címzett email címe */
    email: string;
    /** Email megerősítő token */
    token: string;
}
export interface SendRegisterEmailResponse {
    /** Jelzi, hogy a metódus sikeres volt e vagy sem */
    success: boolean;
}

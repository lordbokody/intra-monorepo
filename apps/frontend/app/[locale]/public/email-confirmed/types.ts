export interface VerifyEmailResponse {
    success: boolean;
    message?: string;
}

export type VerifyEmailStatus = 'loading' | 'success' | 'confirmed' | 'error';
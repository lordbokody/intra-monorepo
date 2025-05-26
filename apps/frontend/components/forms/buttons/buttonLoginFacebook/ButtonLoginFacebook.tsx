"use client"

import { signIn } from "next-auth/react"
import { styles } from "./styles"

export default function ButtonLoginFacebook() {
    return (
        <button
            className={styles.button}
            onClick={() => signIn("facebook")}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-5 h-5"
            >
                <path d="M24 12a12 12 0 1 0-13.875 11.85v-8.385h-2.64V12h2.64V9.356c0-2.607 1.553-4.048 3.932-4.048 1.14 0 2.332.204 2.332.204v2.565h-1.314c-1.296 0-1.7.803-1.7 1.624V12h2.89l-.462 3.465h-2.428v8.385A12.001 12.001 0 0 0 24 12z" />
            </svg>
            Facebook bejelentkezés
        </button>
    )
}

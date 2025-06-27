import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css"

/**
 * Font betöltés
 */
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

/**
 * Font betöltés
 */
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

/**
 * Fő app layout
 */
export default async function LocaleLayout({children, params,}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Betöltjük a localet
    const { locale } = await params;

    // Visszatérünk a fő layouttal
    return (
        <html lang={locale}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-scroll`}>
                <SessionProvider>
                    <NextIntlClientProvider>
                        {children}
                    </NextIntlClientProvider>
                </SessionProvider>
            </body>
        </html>
    );
}

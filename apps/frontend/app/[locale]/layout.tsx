import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default async function LocaleLayout({children, params,}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

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

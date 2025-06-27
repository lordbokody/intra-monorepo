"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {styles} from "./styles";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import { HU, GB } from 'country-flag-icons/react/3x2';
import {usePathname, useRouter} from 'next/navigation'

/**
 * Komponens bemenetek
 */
type TopMenuProps = {
    title: string;
};

/**
 * Top menü komponens
 */
export default function TopMenu({ title }: TopMenuProps) {
    // Létrehozzuk a változót, ami telefonon jelzi, hogy nyitva van e a hamburger menü
    const [isOpen, setIsOpen] = useState(false);

    // Betöltjük a fordításokat
    const t = useTranslations('all');
    const locale = useLocale();

    // Betöltjük a routert
    const pathname = usePathname()
    const router = useRouter()

    // Beállítjuk a menü elemeket
    const menuItems = [
        { label: t("home"), href: `/${locale}/public/login` },
    ];

    // Segédfüggvény a nyelv megváltoztatására
    const changeLanguage = () => {
        // Kinyerjük az url-ből az elemeket
        const [, urlLocale, ...segments] = pathname.split('/');

        // Beállítjuk az új nyelvet
        const newLocale = locale === 'hu' ? 'en' : 'hu';

        // Elkészítjük az új útvonalat
        const newPath = `/${newLocale}${segments.length > 0 ? '/' + segments.join('/') : ''}`;

        // A routeren útvonalat váltunk
        return router.push(newPath);
    }

    return (
        <nav className={styles.nav}>
            {/*Weboldal neve és link a főoldalra*/}
            <Link key={title} href={`/${locale}`} className={styles.logo}>
                {title}
            </Link>

            {/*Asztali nézet menü*/}
            <div className={styles.menuDesktop}>
                {/*Menü elemek*/}
                {menuItems.map((item) => (
                    <Link key={item.label} href={item.href} className={styles.menuEntryDesktop}>
                        {item.label}
                    </Link>
                ))}

                {/*Nyelv váltó gomb*/}
                {locale === 'hu' ? (
                    <GB onClick={changeLanguage} className={styles.languageIcon} />
                ) : (
                    <HU onClick={changeLanguage} className={styles.languageIcon} />
                )}
            </div>

            {/*Hamburger menü mobilon*/}
            <div className={styles.hamburgerWrapper}>
                <button onClick={() => setIsOpen(!isOpen)} className={styles.hamburgerMenu}>
                    <Menu className={styles.hamburgerIcon} />
                </button>
            </div>

            {/*Ha kivan nyitva a hamburger menü akkor mutatjuk mobilon a menü elemeket*/}
            {isOpen && (
                <div className={styles.menuMobile}>
                    {menuItems.map((item) => (
                        <Link key={item.label} href={item.href} className={styles.menuEntryMobile}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

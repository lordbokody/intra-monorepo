"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
    getLogoClassNames,
    getMenuDesktopClassNames,
    getNavClassNames,
    getMenuMobileClassNames,
    getMenuEntryDesktopClassNames,
    getMenuEntryMobileClassNames,
    getHamburgerMenuClassNames,
    getHamburgerIconClassNames,
    getHamburgerWrapperClassNames, getLanguageIconClassNames
} from "./styles";
import Link from "next/link";
import {useTranslations} from "next-intl";
import { useLocale } from 'next-intl';
import { HU, GB } from 'country-flag-icons/react/3x2';

export default function TopMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('all');
    const locale = useLocale();

    const menuItems = [
        { label: t("home"), href: "/public/login" },
    ];

    return (
        <nav className={getNavClassNames()}>
            <div className={getLogoClassNames()}>he</div>

            <div className={getMenuDesktopClassNames()}>
                {menuItems.map((item) => (
                    <Link key={item.label} href={item.href} className={getMenuEntryDesktopClassNames()}>
                        {item.label}
                    </Link>
                ))}
                {locale === 'hu' ? <GB className={getLanguageIconClassNames()}/> : <HU className={getLanguageIconClassNames()}/> }
            </div>


            <div className={getHamburgerWrapperClassNames()}>
                <button onClick={() => setIsOpen(!isOpen)} className={getHamburgerMenuClassNames()}>
                    <Menu className={getHamburgerIconClassNames()} />
                </button>
            </div>

            {isOpen && (
                <div className={getMenuMobileClassNames()}>
                    {menuItems.map((item) => (
                        <Link key={item.label} href={item.href} className={getMenuEntryMobileClassNames()}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

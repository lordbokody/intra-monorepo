"use client";

import { Home, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type SideMenuProps = {
    locale: string;
};

type SideMenuItem = {
    name: string,
    icon: any,
    href: string,
    onClick?: () => void,
}

export default function SideMenu({ locale }: SideMenuProps) {
    const menuItems: SideMenuItem[] = [
        { name: "Főoldal", icon: Home, href: `/${locale}/private/home` },
        // { name: "Profilom", icon: User, href: `/${locale}/profile` },
        // { name: "Beállítások", icon: Settings, href: `/${locale}/settings` },
        { name: "Kilépés", icon: LogOut, href: "#", onClick: signOut },
    ];

    return (
        <aside className="h-full w-full p-4 bg-gray-100">
            <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                            if (item.onClick) {
                                e.preventDefault();
                                item.onClick();
                            }
                        }}
                        className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition-colors"
                    >
                        <item.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">{item.name}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}

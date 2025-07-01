"use client";

import Link from "next/link";

type SideMenuProps = {
    menuItems: SideMenuItem[],
};

type SideMenuItem = {
    name: string,
    icon?: any,
    href: string,
    onClick?: () => void,
    condition?: boolean,
};

export default function SideMenu({ menuItems }: SideMenuProps) {
    return (
        <aside className="h-full w-full p-4 bg-gray-100">
            <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => {
                    if (item.condition === false) return null;
                    const correctedHref = item.href.startsWith('/') ? item.href : `/${item.href}`;
                    return (
                        <Link
                            key={item.name}
                            href={correctedHref}
                            onClick={(e) => {
                                if (item.onClick) {
                                    e.preventDefault();
                                    item.onClick();
                                }
                            }}
                            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition-colors"
                        >
                            {/*<item.icon className="w-5 h-5 text-gray-600" />*/}
                            <span className="text-gray-800">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

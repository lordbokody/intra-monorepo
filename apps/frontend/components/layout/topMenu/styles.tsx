export const getNavClassNames = () => {
    return 'bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center fixed top-0 left-0 w-full z-10 shadow-md'
}

export const getLogoClassNames = () => {
    return "text-xl font-bold text-gray-800"
}

export const getMenuDesktopClassNames = () => {
    return "hidden md:flex space-x-8"
}

export const getMenuMobileClassNames = () => {
    return "absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 md:hidden"
}

export const getMenuEntryDesktopClassNames = () => {
    return "text-gray-600 hover:text-gray-900"
}

export const getMenuEntryMobileClassNames = () => {
    return `py-2 ${getMenuEntryDesktopClassNames()}`
}

export const getHamburgerWrapperClassNames = () => {
    return "md:hidden"
}

export const getHamburgerMenuClassNames = () => {
    return "text-gray-600 hover:text-gray-900 focus:outline-none"
}

export const getHamburgerIconClassNames = () => {
    return "w-6 h-6"
}

export const getLanguageIconClassNames = () => {
    return "w-[20px] cursor-pointer"
}
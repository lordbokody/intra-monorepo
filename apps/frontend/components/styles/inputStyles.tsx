export const inputStyles = {
    // COMMON
    outerDiv: 'flex flex-col gap-1 relative',

    // EMAIL + PASSWORD + TEXT + DATE
    label: 'text-sm font-medium text-gray-700',
    input(showError: string | boolean | undefined, disabled: boolean){
        const baseClassNames = "border rounded-lg px-4 py-2 focus:outline-none focus:ring-2";

        const errorClassNames = showError
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500";

        const disabledClassNames = disabled ? "cursor-not-allowed bg-gray-100" : "";

        return `${baseClassNames} ${errorClassNames} ${disabledClassNames}`;
    },
    error(show: string | boolean | undefined){
        const baseClassNames = 'text-xs mt-1 transition-all duration-200'

        const errorClassNames = show ? 'text-red-500 opacity-100' : 'opacity-0'

        return `${baseClassNames} ${errorClassNames}`
    },

    // EMAIL
    loading(isLoadingIcon: boolean){
        const baseClassNames = "absolute right-[18px] top-[36px] transition-all animate-spin text-gray-600 hover:text-black"

        const loadingClassNames = isLoadingIcon ? 'opacity-100' : 'opacity-0'

        return `${baseClassNames} ${loadingClassNames}`
    },

    // PASSWORD
    showButton: 'absolute right-[18px] top-[36px] cursor-pointer text-gray-600 hover:text-black',

    // DATE
    inputDate(showError: string | boolean | undefined, disabled: boolean){
        return `custom-date-input ${this.input(showError, disabled)}`
    },

    // CHECKBOX
    innerDiv: 'lex items-center gap-2',
    inputCheckbox: 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
    labelCheckbox: 'text-sm text-gray-700'
}
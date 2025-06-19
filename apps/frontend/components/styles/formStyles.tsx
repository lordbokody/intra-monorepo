export const formStyles = {
    form: 'bg-white shadow-md rounded-xl p-6 w-full flex flex-col gap-4',
    label: 'text-2xl font-semibold text-center mb-[50px]',
    required: 'text-sm text-gray-700 mt-[15px]',
    linkRow: 'flex justify-between text-sm text-blue-600 mt-2',
    link: 'hover:underline hover:underline-offset-4',
    linkMessage: 'text-sm text-blue-600 mt-2 hover:underline hover:underline-offset-4 text-center mb-[50px] cursor-pointer',
    description: 'mb-[50px] text-sm text-center text-gray-600',
    error(show: string | boolean | undefined) {
        const baseClassNames = 'text-xs mt-1 transition-all duration-200 mb-[30px]'
        const errorClassNames = show ? 'text-red-500 opacity-100' : 'opacity-0'
        return `${baseClassNames} ${errorClassNames}`
    },
    loadingDiv: 'relative w-full h-[70px]',
    loadingCircle: 'absolute bottom-0 left-1/2 top-0 animate-spin',
    message: 'text-sm text-center text-gray-600',
}
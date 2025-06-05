export const styles = {
    form: 'bg-white shadow-md rounded-xl p-6 w-full flex flex-col gap-4',
    label: 'text-2xl font-semibold text-center',
    required: 'text-sm text-gray-700 mt-[15px]',
    linkRow: 'flex justify-between text-sm text-blue-600 mt-2',
    link: 'hover:underline hover:underline-offset-4',
    error(show: string | boolean | undefined) {
        const baseClassNames = 'text-xs mt-1 transition-all duration-200 mb-[30px]'
        const errorClassNames = show ? 'text-red-500 opacity-100' : 'opacity-0'
        return `${baseClassNames} ${errorClassNames}`
    }
}
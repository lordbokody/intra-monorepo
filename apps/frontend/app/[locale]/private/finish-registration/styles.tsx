export const styles = {
    form: 'bg-white shadow-md rounded-xl p-6 w-full flex flex-col gap-4',
    label: 'text-2xl font-semibold text-center',
    required: 'text-sm text-gray-700 mt-[15px]',
    error(show: string | boolean | undefined) {
        const baseClassNames = 'text-xs mt-1 transition-all duration-200 mb-[30px]'
        const errorClassNames = show ? 'text-red-500 opacity-100' : 'opacity-0'
        return `${baseClassNames} ${errorClassNames}`
    }
}
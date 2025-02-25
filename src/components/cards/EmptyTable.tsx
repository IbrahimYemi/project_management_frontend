type EmptyTableProps<T> = {
    data: T[]
    text?: string
}

const EmptyTable = <T,>({
    data,
    text = 'No data available',
}: EmptyTableProps<T>) => {
    if (data.length > 0) return null

    return (
        <div className="flex flex-col items-center justify-center p-6 text-gray-400">
            <p className="text-lg">{text}</p>
        </div>
    )
}

export default EmptyTable

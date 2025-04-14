export default function ErrorFallback({
    error,
    resetErrorBoundary,
}: {
    error: Error
    resetErrorBoundary: () => void
}) {
    return (
        <div className="text-center p-6 h-screen flex flex-col items-center justify-center space-y-4">
            <div className="max-w-xl flex flex-col items-center justify-center space-y-4 bg-white p-4 rounded-md">
                <h1 className="text-red-600 font-bold text-2xl">Oops!</h1>
                <h2 className="text-red-600 font-bold text-lg">
                    Something went wrong!
                </h2>
                <p className="text-gray-600">{error.message}</p>
                <button
                    onClick={resetErrorBoundary}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Retry
                </button>
            </div>
        </div>
    )
}

import { AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { setAppState } from '@/store/slices/appStateSlice'
import { useAppDispatch } from '@/store/hooks'

type ErrorComponentProps = {
    errorTitle?: string
    errorMessage: string
}

export function ErrorComponent({
    errorMessage,
    errorTitle = 'Oops! Something went wrong.',
}: ErrorComponentProps) {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleGoHome = () => {
        dispatch(setAppState('isIdle'))
        // go to dashboard
        router.push('/dashboard')
    }

    const handleReload = () => {
        dispatch(setAppState('isIdle'))
        // reload the app
        window.location.reload()
    }

    return (
        <div className="flex justify-center items-center m-5 md:m-10 bg-baseColor h-full">
            <div className="text-center bg-red-200 p-8 rounded-md shadow-lg max-w-sm w-full">
                <AlertTriangle className="mx-auto text-red-500 text-6xl mb-6" />
                <h1 className="text-3xl font-semibold text-titleText mb-4">
                    {errorTitle}
                </h1>
                <p className="text-lg text-gray-500 mb-6">{errorMessage}</p>
                <div className="flex items-center justify-between gap-2 mx-auto w-1/2">
                    <button
                        onClick={handleReload}
                        className="w-28 py-3 bg-baseColor text-white rounded-md text-lg hover:bg-red-600 transition"
                    >
                        Reload
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="w-28 py-3 bg-red-500 text-white rounded-md text-lg hover:bg-red-600 transition"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    )
}

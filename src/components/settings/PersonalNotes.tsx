import { ErrorComponent } from '@/components/cards/ErrorComponent'
import FormDispatcher from '@/components/ui/FormDispatcher'
import NotePage from '@/components/views/NotePage'
import { useNotes } from '@/hooks/notes/useNotes'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { Loader, PlusSquareIcon } from 'lucide-react'

export default function PersonalNotes() {
    const { data: notes, isLoading, isError } = useNotes()

    if (isError) return <ErrorComponent errorMessage="Error loading notes" />

    return isLoading ? (
        <div className="flex items-center text-baseColor justify-center h-full m-6 md:mt-24">
            <Loader className="animate-spin" /> Loading...
        </div>
    ) : (
        <div className="w-full text-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Notes Owned</h2>
                <FormDispatcher
                    text={
                        <>
                            <PlusSquareIcon className="size-3" />
                            <h3>Add Personal Note</h3>
                        </>
                    }
                    onOutsideClick={() =>
                        appStorage.remove(STORAGE_KEYS.ACTIVE_PATH_ID)
                    }
                    type={'create-note'}
                    classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                />
            </div>
            <NotePage notes={notes ?? []} />
        </div>
    )
}

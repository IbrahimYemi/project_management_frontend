import { ErrorComponent } from '@/components/cards/ErrorComponent'
import FormDispatcher from '@/components/ui/FormDispatcher'
import NotePage from '@/components/views/NotePage'
import { useNotes } from '@/hooks/notes/useNotes'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import { Loader, PlusSquareIcon } from 'lucide-react'

type NotePageProps = {
    id: string
}

export default function NoteTab({ id }: NotePageProps) {
    const { data: notes, isLoading, isError } = useNotes(id)

    if (isError) return <ErrorComponent errorMessage="Error loading notes" />

    return isLoading ? (
        <div className="flex items-center justify-center h-full text-white m-6 md:mt-24">
            <Loader className="animate-spin" /> Loading...
        </div>
    ) : (
        <div className="py-2 md:py-6 w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Note</h2>
                <FormDispatcher
                    text={
                        <>
                            <PlusSquareIcon className="size-3" />
                            <h3>Add Note</h3>
                        </>
                    }
                    onOutsideClick={() =>
                        appStorage.persist(STORAGE_KEYS.ACTIVE_PATH_ID, id)
                    }
                    type={'create-note'}
                    classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                />
            </div>
            <NotePage notes={notes ?? []} />
        </div>
    )
}

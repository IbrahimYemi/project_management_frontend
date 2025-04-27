import { fetchNotesData } from '@/lib/fn/notes'
import { QUERY_KEYS } from '@/store/constants'
import { Note } from '@/types/notes'
import { useQuery } from '@tanstack/react-query'

export function useNotes(projectId?: string) {
    return useQuery<Note[]>({
        queryKey: [QUERY_KEYS.NOTES, projectId],
        queryFn: () => fetchNotesData(projectId),
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

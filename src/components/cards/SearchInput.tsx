import { useState, useEffect, useCallback } from 'react'
import { Search, Loader2, X } from 'lucide-react'
import { appStorage } from '@/lib/generic.fn'

interface SearchInputProps {
    onSearch: (searchText: string) => Promise<void>
    storageKey: string
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, storageKey }) => {
    const [searchText, setSearchText] = useState(
        () => appStorage.retrieve(storageKey) || '',
    )
    const [debouncedSearch, setDebouncedSearch] = useState(searchText)
    const [loading, setLoading] = useState(false)

    // Debounce effect: Updates debouncedSearch only after user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText)
        }, 500) // Adjust delay as needed

        return () => clearTimeout(handler)
    }, [searchText])

    // Memoized search function to prevent stale state issues
    const handleSearch = useCallback(async () => {
        if (debouncedSearch.trim() === '') return

        setLoading(true)
        await onSearch(debouncedSearch) // Ensure it's awaited to avoid race conditions
        setLoading(false)

        appStorage.persist(storageKey, debouncedSearch)
    }, [debouncedSearch, onSearch, storageKey])

    // Trigger API search when debouncedSearch updates
    useEffect(() => {
        handleSearch()
    }, [debouncedSearch, handleSearch])

    return (
        <div className="flex items-center w-full max-w-md bg-gray-700 text-white border border-gray-500 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            {/* Search Icon */}
            <Search className="w-5 h-5 text-gray-400 mr-2" />

            {/* Search Input */}
            <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                aria-label="Search input"
            />

            {/* Loading Spinner */}
            {loading && (
                <Loader2 className="w-5 h-5 animate-spin text-gray-400 mr-2" />
            )}

            {/* Clear Button */}
            {searchText && (
                <button
                    onClick={() => {
                        setSearchText('')
                        setDebouncedSearch('')
                        appStorage.remove(storageKey)
                    }}
                    className="text-gray-400 hover:text-white transition"
                    aria-label="Clear search"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    )
}

export default SearchInput

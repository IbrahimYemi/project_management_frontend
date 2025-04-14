import { useState } from 'react'
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
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        if (searchText.trim() === '') {
            appStorage.remove(storageKey)
            await onSearch(searchText)
            return
        }

        setLoading(true)
        await onSearch(searchText)
        setLoading(false)

        appStorage.persist(storageKey, searchText)
    }

    return (
        <div className="flex items-center w-full max-w-md bg-gray-700 text-white border border-gray-500 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
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
                        appStorage.remove(storageKey)
                        handleSearch()
                    }}
                    className="text-gray-400 hover:text-white transition mr-2"
                    aria-label="Clear search"
                >
                    <X className="w-5 h-5" />
                </button>
            )}

            {/* Search Button */}
            <button
                onClick={handleSearch}
                className="text-gray-400 hover:text-white transition"
                aria-label="Search button"
            >
                <Search className="w-5 h-5" />
            </button>
        </div>
    )
}

export default SearchInput

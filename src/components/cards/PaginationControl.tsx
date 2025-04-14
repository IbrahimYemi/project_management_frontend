import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

// Define the type for the props
interface PaginationProps {
    currentPage: number
    totalPages: number
    perPage: number
    onPageChange: (page: number, perPage: number) => void
}

const PaginationControl: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    perPage,
    onPageChange,
}) => {
    return totalPages === undefined || totalPages < 1 ? null : (
        <div className="flex flex-col md:flex-row items-start md:justify-between md:items-center mt-4 text-xs md:text-sm gap-2 p-2 md:p-4 border-t">
            {/* Left: Page Details */}
            <div className="space-x-4">
                <span className="flex items-center text-titleText">
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            {/* Right: Pagination Controls */}
            <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1, perPage)}
                    className="md:px-4 px-2 md:py-2 py-1 bg-gray-600 text-white rounded-md disabled:bg-gray-300"
                >
                    <ArrowLeft />
                </button>

                {/* Page Numbers */}
                {currentPage > 3 && (
                    <>
                        <button
                            onClick={() => onPageChange(1, perPage)}
                            className="px-3 py-1 bg-teal-800 rounded"
                        >
                            1
                        </button>
                        {currentPage > 4 && <span className="px-2">...</span>}
                    </>
                )}

                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1
                    if (
                        page === currentPage ||
                        page === currentPage - 1 ||
                        page === currentPage - 2 ||
                        page === currentPage + 1 ||
                        page === currentPage + 2
                    ) {
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page, perPage)}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-teal-800'
                                }`}
                            >
                                {page}
                            </button>
                        )
                    }
                    return null
                })}

                {currentPage < totalPages - 2 && (
                    <>
                        {currentPage < totalPages - 3 && (
                            <span className="px-2">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages, perPage)}
                            className="px-3 py-1 bg-teal-800 rounded"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next Button */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1, perPage)}
                    className="md:px-4 px-2 md:py-2 py-1 bg-gray-600 text-white rounded-md disabled:bg-gray-300"
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    )
}

export default PaginationControl

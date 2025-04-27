import { ReactNode, useState } from 'react'
import ConfirmModal from './ConfirmModal'

type DeleteButtonProps = {
    text: ReactNode
    onClick: () => void
    classNames?: string
    confirmStatement?: string
}

export default function DeleteButton({
    text,
    onClick,
    classNames = '',
    confirmStatement = 'Are you sure you want to delete this item?',
}: DeleteButtonProps) {
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <>
            <button
                className={`${
                    classNames
                        ? classNames
                        : 'bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded'
                } transition`}
                onClick={() => setModalOpen(true)}>
                {text}
            </button>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={onClick}
                message={confirmStatement}
            />
        </>
    )
}

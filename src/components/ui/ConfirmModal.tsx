type ConfirmModalProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message: string
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message,
}: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[5000]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-baseColor text-lg font-semibold mb-3">
                    {title}
                </h2>
                <p className="text-baseColor mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

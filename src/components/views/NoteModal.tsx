import { motion } from 'framer-motion'
import { Note } from '@/types/notes'
import { toast } from 'react-toastify'
import { Copy } from 'lucide-react'

function NoteModal({ note, onClose }: { note: Note; onClose: () => void }) {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            toast.success('Note link copied successfully!')
        } catch {
            toast.error('Failed to copy link.')
        }
    }

    return (
        <motion.div
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/40 backdrop-blur-sm P-2"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-xl p-6 max-w-lg max-h-[95vh] overflow-y-auto w-full relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
            >
                {/* Top Buttons */}
                <div className="absolute top-3 right-4 flex items-center space-x-3">
                    {/* Copy Icon */}
                    <button
                        onClick={handleCopyLink}
                        className="text-gray-600 hover:text-emerald-600 transition"
                        title="Copy link to note"
                    >
                        <Copy size={20} />
                    </button>

                    {/* Close Button */}
                    <button
                        className="text-gray-600 hover:text-black transition"
                        onClick={onClose}
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Note Title */}
                <h2 className="text-2xl font-bold text-emerald-700 mb-2">
                    {note.title}
                </h2>

                {/* Note Content */}
                <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {note.content}
                </p>
            </motion.div>
        </motion.div>
    )
}

export default NoteModal

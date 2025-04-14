import { Loader2 } from 'lucide-react'

export default function BottomLeftLoader() {
    return (
        <div className="fixed bottom-2 left-2 p-3 bg-black bg-opacity-80 rounded-lg flex items-center gap-2 text-white z-[5000]">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing request...</span>
        </div>
    )
}

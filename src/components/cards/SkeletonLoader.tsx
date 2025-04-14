export default function SkeletonLoader() {
    return (
        <div className="grid grid-cols-2 items-start gap-4">
            <div className="h-48 bg-neutral-900 rounded-md transition-colors animate-pulse" />
            <div className="h-48 bg-neutral-900 rounded-md transition-colors animate-pulse" />
            <div className="h-48 bg-neutral-900 rounded-md transition-colors animate-pulse" />
            <div className="h-48 bg-neutral-900 rounded-md transition-colors animate-pulse" />
            <div className="h-64 bg-neutral-900 rounded-md transition-colors animate-pulse col-span-2" />
        </div>
    )
}

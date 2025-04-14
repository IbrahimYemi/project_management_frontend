import { priorityColors } from '@/store/RoughData'
import React from 'react'

export default function Badge({ priority }: { priority: string }) {
    return (
        <div
            style={{
                backgroundColor:
                    priorityColors[priority] || priorityColors.default,
            }}
            className="capitalize text-center inline-block text-xs px-3 py-2 rounded text-white"
        >
            {priority.toUpperCase()}
        </div>
    )
}

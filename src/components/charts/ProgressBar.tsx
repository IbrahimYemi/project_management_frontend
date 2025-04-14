import React from 'react'

type ProgressProps = {
    percentage: number
}

export default function ProgressBar({ percentage }: ProgressProps) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className="h-full rounded-full transition-all"
                style={{
                    width: `${percentage}%`,
                    backgroundColor:
                        percentage === 100
                            ? 'green'
                            : percentage >= 40
                              ? 'teal'
                              : 'red',
                }}
            />
        </div>
    )
}

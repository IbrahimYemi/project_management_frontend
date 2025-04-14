interface CircularProgressProps {
    percentage: number
}

const CircularProgress = ({ percentage }: CircularProgressProps) => {
    const radius = 50 // Radius of the circle
    const strokeWidth = 10 // Thickness of the stroke
    const circumference = 2 * Math.PI * radius // Calculate circumference
    const progress = (percentage / 100) * circumference // Calculate stroke-dashoffset

    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            <svg width="100" height="100" viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#777777"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress Circle */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#51f804"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress} // Adjust progress
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)" // Start from top
                />
            </svg>
            {/* Percentage Text in Center */}
            <span className="absolute text-lg font-semibold">
                {percentage}%
            </span>
        </div>
    )
}

export default CircularProgress

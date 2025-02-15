interface AuthSessionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    authStatus: string | null
    className?: string
}

const AuthSessionStatus = ({
    authStatus,
    className = '',
    ...props
}: AuthSessionStatusProps) => {
    if (!authStatus) return null

    return (
        <div
            className={`${className} font-medium text-sm text-green-600`}
            {...props}
        >
            {authStatus}
        </div>
    )
}

export default AuthSessionStatus

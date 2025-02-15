const InputError = ({
    messages,
    className = '',
}: {
    messages?: string | string[]
    className?: string
}) => {
    if (!messages) return null

    const messageArray = Array.isArray(messages) ? messages : [messages]

    return (
        <>
            {messageArray.map((message, index) => (
                <p className={`${className} text-sm text-red-600`} key={index}>
                    {message}
                </p>
            ))}
        </>
    )
}

export default InputError

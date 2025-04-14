export default function TruncateText({
    text,
    limit = 5,
}: {
    text: string
    limit?: number
}) {
    return (
        <span title={text}>
            {text.length > limit ? text.slice(0, limit) + '...' : text}
        </span>
    )
}

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
        return NextResponse.json(
            { error: 'Missing image URL' },
            { status: 400 },
        )
    }

    try {
        const response = await fetch(imageUrl)
        const contentType = response.headers.get('content-type')

        if (!contentType || !contentType.startsWith('image/')) {
            return NextResponse.json(
                { error: 'URL must be an image' },
                { status: 400 },
            )
        }

        const imageBuffer = await response.arrayBuffer()
        return new NextResponse(Buffer.from(imageBuffer), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 's-maxage=86400, stale-while-revalidate',
            },
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Failed to fetch image' },
            { status: 500 },
        )
    }
}

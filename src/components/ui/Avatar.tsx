'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/store/hooks'

interface AvatarProps {
    size?: number
    username?: string
    userImage?: string
}

const Avatar: React.FC<AvatarProps> = ({ size = 40, userImage, username }) => {
    const { user: authUser } = useAppSelector(state => state.auth)
    const authUserImageUrl = authUser?.avatar
    const authUserName = authUser?.name || 'App User'
    const [isImageError, setIsImageError] = useState(false)

    const imageUrl = userImage ?? authUserImageUrl
    const name = username ?? authUserName

    const getInitials = (name: string) => {
        const words = name.trim().split(' ')
        return words.length > 1
            ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
            : words[0][0].toUpperCase()
    }

    const proxiedImageUrl = imageUrl
        ? `/api/avatar?url=${encodeURIComponent(imageUrl)}`
        : null

    return (
        <div
            className="relative flex items-center justify-center rounded-full bg-titleText text-white font-bold"
            style={{ width: size, height: size, fontSize: size / 2.5 }}
        >
            {!isImageError && proxiedImageUrl ? (
                <Image
                    src={proxiedImageUrl}
                    alt={name}
                    width={size}
                    height={size}
                    className="rounded-full object-cover"
                    onError={() => setIsImageError(true)}
                />
            ) : (
                <span>{getInitials(name)}</span>
            )}
        </div>
    )
}

export default Avatar

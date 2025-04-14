'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/store/hooks'
import { X } from 'lucide-react'

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
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const handleAvatarClick = () => {
        if (proxiedImageUrl && !isImageError) setIsModalOpen(true)
    }

    return (
        <>
            <div
                className="relative flex items-center justify-center rounded-full bg-titleText text-white font-bold cursor-pointer"
                style={{ width: size, height: size, fontSize: size / 2.5 }}
                onClick={handleAvatarClick}
            >
                {!isImageError && proxiedImageUrl ? (
                    <Image
                        src={proxiedImageUrl}
                        alt={name}
                        width={size}
                        height={size}
                        className="rounded-full object-cover h-full w-full"
                        onError={() => setIsImageError(true)}
                    />
                ) : (
                    <span>{getInitials(name)}</span>
                )}
            </div>

            {/* Modal for preview */}
            {isModalOpen && proxiedImageUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[5200] flex items-center justify-center">
                    <div className="relative">
                        <button
                            className="absolute -top-4 -right-4 bg-white text-black rounded-full p-1 shadow"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X size={18} />
                        </button>
                        <Image
                            src={proxiedImageUrl}
                            alt={name}
                            width={400}
                            height={400}
                            className="rounded-xl object-contain max-h-[80vh] max-w-[80vw] mx-auto"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Avatar

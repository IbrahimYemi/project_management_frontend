import { Team } from '@/types/teams'
import Avatar from '../ui/Avatar'
import { User } from '@/types/authTypes'
import FormDispatcher from '../ui/FormDispatcher'
import { Edit2Icon } from 'lucide-react'
import { appStorage } from '@/lib/generic.fn'
import { STORAGE_KEYS } from '@/store/constants'
import Link from 'next/link'

type Props = {
    team: Team
    members: User[]
    bgStyle?: string
}

export default function TeamMembers({
    team,
    members,
    bgStyle = 'bg-white text-baseColor',
}: Props) {
    const handlePathIdPersist = () => {
        appStorage.persist(STORAGE_KEYS.ACTIVE_PATH_ID, team.id)
    }

    return (
        <div className={`py-2 md:py-6 rounded-lg ${bgStyle} relative`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold mb-4">{team.name}</h3>
                {/* edit button */}
                <FormDispatcher
                    text={
                        <>
                            <Edit2Icon className="size-3" />
                            <h3>Edit Team</h3>
                        </>
                    }
                    onOutsideClick={handlePathIdPersist}
                    type={'edit-team'}
                    classNames="bg-emerald-700 flex items-center gap-1 text-sm md:text-base text-white rounded-md text-center py-0.5 px-2"
                />
            </div>
            <p className="font-semibold">Lead: {team.teamLead}</p>
            <p className="font-semibold">Total Members: {team.members}</p>

            <div className="mt-5">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-3">
                    {/* Team members list */}
                    {members.map(member => (
                        <Link
                            href={`/users/${member.id}/view`}
                            key={member.id}
                            title={member.name}
                            role='View User'
                            className="flex items-center space-x-3 border-b py-2 hover:bg-gray-600 p-1 rounded-md">
                            <Avatar
                                userImage={member.avatar}
                                username={member.name}
                            />
                            <div>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm">{member.role}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

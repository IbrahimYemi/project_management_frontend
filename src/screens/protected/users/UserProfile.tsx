import AccountSettings from '@/components/settings/AccountSettings'
import ProjectsTable from '@/components/tables/ProjectsTable'
import { User } from '@/types/authTypes'
import { Projects } from '@/types/projects'

export default function UserProfile({
    projects,
    user,
}: {
    projects: Projects[]
    user: User
}) {
    return (
        <div className=" bg-baseColor rounded-lg text-white">
            {/* Team Members Section */}
            <AccountSettings user={user || ({} as User)} styles="block h-fit" />
            <div className="w-full overflow-x-auto mt-5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Projects</h3>
                </div>
                <ProjectsTable
                    projects={projects ?? []}
                    completeFilter={false}
                />
            </div>
        </div>
    )
}

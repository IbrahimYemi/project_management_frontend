import { Projects } from '@/types/projects'
import CircularProgress from '../charts/CircularProgress'
import { format } from 'date-fns'

interface Props {
    project: Projects
}

export default function ProjectOverview({ project }: Props) {
    return (
        <div className="py-2 md:py-6 text-white rounded-lg">
            {/* Project Title and Status */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold">
                        Created:{' '}
                        {project?.created_at
                            ? format(
                                  new Date(project.created_at),
                                  'MMM dd, yyyy',
                              )
                            : 'N/A'}
                    </h3>
                </div>
                <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        project?.is_completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                    {project?.is_completed ? 'Completed' : 'In Progress'}
                </span>
            </div>

            {/* Progress & Stats */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <span className="md:text-lg">
                        📌 Tasks: {project?.task_count}
                    </span>
                    <span className="md:text-lg">
                        👥 Members: {project?.members_count}
                    </span>
                    <span className="md:text-lg">
                        🚀 Team: {project?.team_name}
                    </span>
                </div>
                <CircularProgress percentage={project?.percentage} />
            </div>

            {/* Description */}
            <p className="mt-4 leading-relaxed text-sm md:text-base">
                {project?.description}
            </p>
        </div>
    )
}

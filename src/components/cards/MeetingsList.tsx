import { Meeting } from '@/types/dashboard'

type MeetingListProps = {
    meetings: Meeting[]
}

export default function MeetingList({ meetings }: MeetingListProps) {
    return (
        <div className="bg-baseColor text-white p-4 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-titleText text-xl font-bold mb-4">
                Upcoming Meetings
            </h2>
            <ul className="space-y-3">
                {meetings.map((meeting, index) => (
                    <li
                        key={index}
                        className="border border-titleText p-3 rounded-md"
                    >
                        <h3 className="text-lg font-semibold">
                            {meeting.agenda}
                        </h3>
                        <p className="text-sm">Date: {meeting.date}</p>
                        <p className="text-sm">Time: {meeting.time}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

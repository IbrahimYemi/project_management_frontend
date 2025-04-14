interface TabsProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
    const tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'team', label: 'Team' },
        { key: 'tasks', label: 'Tasks' },
        { key: 'meetings', label: 'Meetings' },
        { key: 'notes', label: 'Notes' },
    ]

    return (
        <div className="flex border-b my-2 overflow-x-auto gap-2">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 text-sm md:text-lg bg-gray-900 rounded p-1 ${
                        activeTab === tab.key
                            ? 'border-b-2 border-brand font-semibold'
                            : 'text-gray-500'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

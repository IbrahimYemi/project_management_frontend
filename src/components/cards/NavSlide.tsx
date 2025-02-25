import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { tabs } from '@/store/RoughData'
import { setDashboardTab } from '@/store/slices/dashboardTabSlice'
import { motion } from 'framer-motion'

export default function NavSlide() {
    const { dashboardTab } = useAppSelector(state => state.dashboardTab)
    const dispatch = useAppDispatch()
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const activeTab = tabsRef.current.find(
            tab => tab?.textContent === dashboardTab,
        )
        if (activeTab) {
            setIndicatorStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
            })
        }
    }, [dashboardTab])

    return (
        <div className="relative rounded-md py-1 px-3 bg-white w-auto flex gap-3 items-center justify-end">
            <motion.div
                className="absolute bottom-0 h-7 bg-baseColor rounded-md mb-1"
                animate={indicatorStyle}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />

            {tabs.map((tab, index) => (
                <button
                    key={tab}
                    ref={el => {
                        tabsRef.current[index] = el
                    }}
                    onClick={() => dispatch(setDashboardTab(tab))}
                    className={`relative py-1 px-3 rounded-md text-sm transition-all ${
                        dashboardTab === tab
                            ? 'text-complement'
                            : 'hover:bg-baseColor hover:text-complement'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}

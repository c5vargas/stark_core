import { useState } from "react"

type StatsType = {
	avg: number,
	value: number
}

const useDashboard = () => {
	const defaultStats = {avg: 0, value: 0}
	const [customersStats, setCustomersStats] = useState<StatsType>(defaultStats)
	const [salesStats, setsalesStats] = useState<StatsType>(defaultStats)
	const [avgRevenueStats, setAvgRevenueStats] = useState<StatsType>(defaultStats)

	const handleUpdate = () => {
		
	}

	return {
		customersStats,
		salesStats,
		avgRevenueStats,
		handleUpdate
	}
}

export default useDashboard
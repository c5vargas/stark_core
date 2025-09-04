import { useMemo, useState } from "react"
import { Duration, SimpleStatsType } from "@/contexts/dashboard/libs/types"

type StatsCardProps = {
  stats: SimpleStatsType,
  onUpdate: (newVal: any) => void
}


const StatsCard = ({stats, onUpdate}: StatsCardProps) => {
  const [duration, setDuration] = useState<Duration>(stats.duration) 

  const getDurationLabel = useMemo(() => {
    switch(duration) {
      case Duration.Daily:
        return "Diario"
      case Duration.Weekly:
        return "Semanal"
      case Duration.Monthly:
        return "Mensual"
      case Duration.Yearly:
        return "Anual"
    }
  }, [duration])

  const handleTime = () => {
    setDuration(Duration.Monthly)
    onUpdate("Something...")
  }

  return (
    <div className="w-full max-w-full px-3 shrink-0 sm:flex-0 sm:w-4/12">
      <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="relative flex-auto p-4">
          <div className="flex flex-wrap -mx-3 ">
            <div className="w-7/12 max-w-full px-3 text-left flex-0">
              <p className="mb-1 font-semibold leading-normal capitalize text-sm">{stats.title}</p>
              <h5 className="mb-0 font-bold">{stats.amount}€</h5>
              <span className="mt-auto mb-0 font-bold leading-normal text-right text-lime-500 text-sm">
                <span className="me-1">{stats.avg}%</span>
                <span className="font-normal text-slate-400">since last month</span>
              </span>
            </div>
            <div className="w-5/12 max-w-full px-3 flex-0">
              <div className="relative text-right">
                <span className="leading-tight text-xs text-slate-400" onClick={handleTime}>{getDurationLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
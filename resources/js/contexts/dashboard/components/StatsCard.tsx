import { useMemo, useState } from 'react'
import { Duration, SimpleStatsType } from '@/contexts/dashboard/libs/types'

type StatsCardProps = {
  stats: SimpleStatsType
  onUpdate: (newVal: unknown) => void
}

const StatsCard = ({ stats, onUpdate }: StatsCardProps) => {
  const [duration, setDuration] = useState<Duration>(stats.duration)

  const getDurationLabel = useMemo(() => {
    switch (duration) {
      case Duration.Daily:
        return 'Diario'
      case Duration.Weekly:
        return 'Semanal'
      case Duration.Monthly:
        return 'Mensual'
      case Duration.Yearly:
        return 'Anual'
    }
  }, [duration])

  const handleTime = () => {
    setDuration(Duration.Monthly)
    onUpdate('Something...')
  }

  return (
    <div className="w-full max-w-full shrink-0 px-3 sm:w-4/12 sm:flex-0">
      <div className="shadow-soft-xl relative flex min-w-0 flex-col rounded-2xl border-0 bg-white bg-clip-border break-words">
        <div className="relative flex-auto p-4">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-7/12 max-w-full flex-0 px-3 text-left">
              <p className="mb-1 text-sm leading-normal font-semibold capitalize">{stats.title}</p>
              <h5 className="mb-0 font-bold">{stats.amount}€</h5>
              <span className="mt-auto mb-0 text-right text-sm leading-normal font-bold text-lime-500">
                <span className="me-1">{stats.avg}%</span>
                <span className="font-normal text-slate-400">since last month</span>
              </span>
            </div>
            <div className="w-5/12 max-w-full flex-0 px-3">
              <div className="relative text-right">
                <span className="text-xs leading-tight text-slate-400" onClick={handleTime}>
                  {getDurationLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard

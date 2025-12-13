import { memo } from 'react'
import Loading from '@/contexts/shared/components/Loading'

interface TableComponentProps {
  children: React.ReactNode
  loading: boolean
}

const TableComponent = ({ children, loading }: TableComponentProps) => {
  if (loading)
    return (
      <section className="flex min-h-[300px] w-full items-center justify-center">
        <Loading />
      </section>
    )

  return <table className="w-full table-auto border-collapse">{children}</table>
}

export default memo(TableComponent)

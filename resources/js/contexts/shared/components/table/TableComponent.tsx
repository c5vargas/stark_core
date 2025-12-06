import Loading from '@/contexts/shared/components/Loading'

const TableComponent = ({ children, loading }: { children: React.ReactNode; loading: boolean }) => {
  if (loading)
    return (
      <section className="flex min-h-[300px] w-full items-center justify-center">
        <Loading />
      </section>
    )

  return <table className="w-full table-auto border-collapse">{children}</table>
}

export default TableComponent

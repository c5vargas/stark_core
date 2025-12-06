import { ArrowLeftIcon, ArrowRightIcon } from '../HugeIcons'

interface TableFooterProps {
  page: number
  onPageChange: (delta: number) => void
  hasNextPage?: boolean
  total?: number
  showing?: number
}

const TableFooter = ({
  page,
  onPageChange,
  hasNextPage = true,
  total,
  showing,
}: TableFooterProps) => {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
      {total !== undefined && showing !== undefined && (
        <div className="text-sm text-gray-600">
          Showing {showing} of {total} results
        </div>
      )}
      <nav className="flex items-center gap-2" aria-label="Pagination">
        <button
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-sm text-slate-600 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
          disabled={page === 1}
          onClick={() => onPageChange(-1)}
          aria-label="Previous page"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>

        <span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-violet-500 px-3 py-1 text-sm font-medium text-white">
          {page}
        </span>

        <button
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-sm text-slate-600 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!hasNextPage}
          onClick={() => onPageChange(1)}
          aria-label="Next page"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}

export default TableFooter

import { ArrowLeftIcon, ArrowRightIcon } from '../HugeIcons'

interface TableFooterProps {
  page: number
  onPageChange: (delta: number) => void
  hasNextPage?: boolean
}

const TableFooter = ({ page, onPageChange, hasNextPage = true }: TableFooterProps) => {
  return (
    <div className="flex items-center justify-end border-t border-slate-200 px-6 py-4">
      <nav className="flex items-center gap-2" aria-label="Pagination">
        <button
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-sm text-slate-600 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
          disabled={page === 1}
          onClick={() => onPageChange(-1)}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>

        <span className="inline-flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full bg-violet-500 px-3 py-1 text-sm font-medium text-white">
          {page}
        </span>

        <button
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-sm text-slate-600 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!hasNextPage}
          onClick={() => onPageChange(1)}
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </nav>
    </div>
  )
}

export default TableFooter

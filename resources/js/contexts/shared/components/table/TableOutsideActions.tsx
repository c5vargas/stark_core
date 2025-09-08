import { ExportCSVIcon } from '@/contexts/shared/components/Icons'

interface TableOutsideActionsProps {
  filters?: string[]
  addBtnLabel?: string
  onCreate?: () => void
  onExport?: () => void
  onUpdateFilters?: () => void
  onSearch?: (query: string) => void
}

const TableOutsideActions = ({
  filters = [],
  addBtnLabel = 'Add new',
  onCreate,
  onUpdateFilters,
  onSearch,
  onExport,
}: TableOutsideActionsProps) => {
  return (
    <div className="-mx-3 justify-between sm:flex">
      {onCreate && (
        <div>
          <a
            href="#"
            className="hover:scale-102 hover:shadow-soft-xs leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 mb-4 inline-block cursor-pointer rounded-lg border-0 bg-gradient-to-tl from-purple-700 to-pink-500 px-6 py-3 text-center align-middle text-xs font-bold uppercase text-white transition-all active:opacity-85"
            onClick={onCreate}
          >
            {addBtnLabel}
          </a>
        </div>
      )}

      <div className="flex">
        {filters.length > 0 && (
          <div className="relative inline">
            <a
              href="#"
              dropdown-trigger=""
              className="hover:scale-102 leading-pro ease-soft-in tracking-tight-soft active:shadow-soft-xs mb-4 inline-block cursor-pointer select-auto rounded-lg border border-solid border-slate-700 bg-transparent px-6 py-3 text-center align-middle text-xs font-bold uppercase text-slate-700 shadow-none transition-all hover:border-slate-700 hover:bg-transparent hover:opacity-75 active:border-slate-700 active:bg-slate-700 active:text-white active:opacity-85"
              aria-expanded="false"
              onClick={onUpdateFilters}
            >
              Filtros
            </a>
            <ul
              dropdown-menu=""
              className="z-100 shadow-soft-3xl duration-250 transform-dropdown before:duration-350 before:font-awesome before:ease-soft before:text-5.5 pointer-events-none absolute left-auto right-2 top-1.5 m-0 mt-2 block min-w-44 origin-top cursor-pointer list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-sm text-slate-500 opacity-0 transition-all will-change-transform before:absolute before:left-auto before:right-5 before:top-0 before:z-40 before:text-white before:transition-all before:content-['\f0d8'] sm:-mr-6 dark:bg-gray-950"
            >
              {filters.map(item => (
                <li key={item} className="relative">
                  <a
                    className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg px-4 font-normal text-slate-500 transition-colors hover:bg-gray-200 hover:text-slate-700 focus:bg-gray-200 focus:text-slate-700 lg:duration-300 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {onExport && (
          <button
            data-type="csv"
            type="button"
            export-button-list=""
            className="hover:scale-102 leading-pro ease-soft-in tracking-tight-soft active:shadow-soft-xs mb-4 ml-2 inline-block cursor-pointer rounded-lg border border-solid border-slate-700 bg-transparent px-6 py-3 text-center align-middle text-xs font-bold uppercase text-slate-700 shadow-none transition-all hover:border-slate-700 hover:bg-transparent hover:opacity-75 active:border-slate-700 active:bg-slate-700 active:text-white active:opacity-85"
            onClick={onExport}
          >
            <span>
              <ExportCSVIcon />
            </span>
            <span>Exportar CSV</span>
          </button>
        )}

        {onSearch && (
          <div className="flex h-16 items-center justify-end px-4">
            <input
              className="focus:shadow-soft-primary-outline ease-soft h-9 rounded-lg border px-2 focus:outline-none focus:transition-shadow"
              placeholder="Search..."
              type="text"
              onChange={ev => onSearch(ev.currentTarget.value)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TableOutsideActions

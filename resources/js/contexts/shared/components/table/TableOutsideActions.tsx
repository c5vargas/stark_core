import { ExportCSVIcon } from "@/contexts/shared/components/Icons"

interface TableOutsideActionsProps {
  filters?: string[],
  addBtnLabel?: string,
  onCreate?: () => void,
  onExport?: () => void,
  onUpdateFilters?: () => void,
  onSearch?: (query: string) => void
}

const TableOutsideActions = ({filters = [], addBtnLabel = 'Add new', onCreate, onUpdateFilters, onSearch, onExport}: TableOutsideActionsProps) => {
  return (
    <div className="justify-between sm:flex -mx-3">
      { onCreate && 
        <div>
          <a href="#" 
            className="inline-block px-6 py-3 mb-4 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25"
            onClick={onCreate}>{addBtnLabel}</a>
        </div>
      }

      <div className="flex">
        { filters.length > 0 && 
          <div className="relative inline">
            <a href="#" 
              dropdown-trigger="" 
              className="inline-block px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer select-auto hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85 active:shadow-soft-xs border-slate-700 text-slate-700 hover:border-slate-700 hover:bg-transparent hover:opacity-75 active:border-slate-700 active:bg-slate-700 active:text-white" 
              aria-expanded="false"
              onClick={onUpdateFilters}>
              Filtros
            </a>
            <ul dropdown-menu="" className="z-100 min-w-44 text-sm shadow-soft-3xl duration-250 transform-dropdown before:duration-350 before:font-awesome before:ease-soft before:text-5.5 dark:bg-gray-950 pointer-events-none absolute top-1.5 right-2 left-auto m-0 mt-2 block origin-top cursor-pointer list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all will-change-transform before:absolute before:top-0 before:right-5 before:left-auto before:z-40 before:text-white before:transition-all before:content-['\f0d8'] sm:-mr-6">
              {filters.map(item => <li key={item} className="relative"><a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg px-4 font-normal text-slate-500 transition-colors hover:bg-gray-200 hover:text-slate-700 focus:bg-gray-200 focus:text-slate-700 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700 lg:duration-300" href="#">{item}</a></li> )}
            </ul>
          </div>
        }

        { onExport && 
          <button 
            data-type="csv" 
            type="button" 
            export-button-list="" 
            className="inline-block px-6 py-3 mb-4 ml-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft active:opacity-85 active:shadow-soft-xs border-slate-700 text-slate-700 hover:border-slate-700 hover:bg-transparent hover:opacity-75 active:border-slate-700 active:bg-slate-700 active:text-white"
            onClick={onExport}>
            <span>
              <ExportCSVIcon />
            </span>
            <span>Exportar CSV</span>
          </button>
        }

        { onSearch && 
          <div className="h-16 px-4 flex items-center justify-end">
            <input 
              className="border rounded-lg h-9 px-2 focus:shadow-soft-primary-outline ease-soft focus:outline-none focus:transition-shadow" 
              placeholder="Search..." 
              type="text" 
              onChange={(ev) => onSearch(ev.currentTarget.value)} />
          </div>
        }

      </div>
    </div>
  )
}

export default TableOutsideActions
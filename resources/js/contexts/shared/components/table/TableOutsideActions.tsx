import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { BaseButton } from '../Button'
interface TableOutsideActionsProps {
  addBtnLabel?: string
  onCreate?: () => void
  onSearch?: (query: string) => void
}

const TableOutsideActions = ({
  addBtnLabel = 'Add new',
  onCreate,
  onSearch,
}: TableOutsideActionsProps) => {
  return (
    <div className="-mx-3 my-2 items-center justify-between sm:flex">
      {onCreate && (
        <div>
          <BaseButton
            title={addBtnLabel}
            variant="primary"
            className="px-6 py-3 !text-base"
            onClick={onCreate}
          />
        </div>
      )}

      <div className="flex">
        {onSearch && (
          <div className="flex items-center justify-end px-4">
            <InputText
              className="bg-white"
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

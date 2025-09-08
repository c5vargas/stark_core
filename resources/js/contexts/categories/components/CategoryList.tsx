import { Category } from '../libs/types'
import { EditIcon, TrashIcon } from '@/contexts/shared/components/Icons'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { useTranslation } from 'react-i18next'
import TableHead from '@/contexts/shared/components/table/TableHead'
import TableComponent from '@/contexts/shared/components/table/TableComponent'
import TableActionBtn from '@/contexts/shared/components/table/TableActionBtn'
import useCategoryTranslated from '../hooks/useCategoryTranslated'

interface CategoryListProps {
  elements: Category[]
  loading: boolean
  onUpdate: () => void
}

const CategoryList = ({ elements, loading, onUpdate }: CategoryListProps) => {
  const { t } = useTranslation()

  return (
    <TableComponent loading={loading}>
      <TableHead
        values={[
          t('dashboard.categories.form.name'),
          t('dashboard.categories.form.date'),
          t('dashboard.categories.form.dishes'),
          t('dashboard.dishes.form.languages'),
          '',
        ]}
      />

      <tbody>
        {elements.map(item => (
          <CategoryItem key={item.id} category={item} onUpdate={onUpdate} />
        ))}
      </tbody>
    </TableComponent>
  )
}

const CategoryItem = ({ category, onUpdate }: { category: Category; onUpdate: () => void }) => {
  const getCategory = useCategoryTranslated(category)
  const { t } = useTranslation()

  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const handleEdit = (item: Category) => {
    navigate(`/dashboard/categories/${item.id}`)
  }

  const handleDestroy = async (id: number | undefined) => {
    if (id) {
      showAlert(t('dashboard.categories.destroy'), 'warning', () => destroyCat(id))
    }
  }

  const destroyCat = async (id: number) => {
    // await destroyCategory(id)
    console.log('Id', id)
    onUpdate()
  }

  return (
    getCategory && (
      <tr className="group h-14 cursor-pointer duration-300 hover:bg-gray-100 [&>td]:min-w-[120px] [&>td]:px-6">
        <td className="w-full border-collapse border-y border-slate-200">
          <div className="flex">
            <div>
              <img
                className="ease-soft-in-out mr-4 inline-flex h-9 w-9 items-center justify-center rounded-xl object-cover text-sm text-white transition-all duration-200"
                src={getCategory.image}
                alt={getCategory.name}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-0 text-sm capitalize leading-normal text-gray-600">
                {getCategory.name}
              </h6>
            </div>
          </div>
        </td>

        <td className="border-collapse border-y border-slate-200 font-semibold">
          <span className="my-2 text-xs leading-tight">{getCategory.created_at}</span>
        </td>

        <td className="border-collapse border-y border-slate-200 font-semibold"></td>

        <td className="border-collapse border-y border-slate-200 font-semibold">
          <div className="flex items-center gap-2">
            {Object.keys(category.translates).map(el => (
              <span
                className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tl from-purple-700 to-pink-500 text-[0.6em] font-bold uppercase text-white shadow-sm"
                key={el}
              >
                {el}
              </span>
            ))}
          </div>
        </td>

        <td className="border-collapse border-y border-slate-200 font-semibold opacity-0 duration-300 group-hover:opacity-100">
          <div className="flex items-center justify-end gap-2">
            <TableActionBtn icon={<EditIcon />} onClick={() => handleEdit(category)} />
            <TableActionBtn icon={<TrashIcon />} onClick={() => handleDestroy(category.id)} />
          </div>
        </td>
      </tr>
    )
  )
}

export default CategoryList

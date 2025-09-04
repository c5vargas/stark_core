import { Category } from "../libs/types"
import { EditIcon, TrashIcon } from "@/contexts/shared/components/Icons"
import { useNavigate } from "react-router-dom"
import { useAlert } from "@/contexts/shared/contexts/AlertContext"
import { useTranslation } from "react-i18next"
import TableHead from "@/contexts/shared/components/table/TableHead"
import TableComponent from "@/contexts/shared/components/table/TableComponent"
import TableActionBtn from "@/contexts/shared/components/table/TableActionBtn"
import destroyCategory from "../actions/destroyCategory"
import useCategoryTranslated from "../hooks/useCategoryTranslated"

interface CategoryListProps {
  elements: Category[],
  loading: boolean,
  onUpdate: () => void
}

const CategoryList = ({ elements, loading, onUpdate }: CategoryListProps) => {
  const { t } = useTranslation();

  return (
    <TableComponent loading={loading}>
      <TableHead values={[t('dashboard.categories.form.name'), t('dashboard.categories.form.date'), t('dashboard.categories.form.dishes'), t('dashboard.dishes.form.languages'), '']} />

      <tbody>
        { elements.map(item => <CategoryItem key={item.id} category={item} onUpdate={onUpdate} />)}
      </tbody>
    </TableComponent>
  )
}

const CategoryItem = ({category, onUpdate}: {category: Category, onUpdate: () => void}) => {
  const getCategory = useCategoryTranslated(category);
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleEdit = (item: Category) => {
    navigate(`/dashboard/categories/${item.id}`)
  }

  const handleDestroy = async(id: number|undefined) => {
    if(id) {
      showAlert(t('dashboard.categories.destroy'), 'warning', () => destroyCat(id));
    };
  }

  const destroyCat = async(id: number) => {
    await destroyCategory(id)
    onUpdate();
  }

  return getCategory && (
    <tr className="h-14 [&>td]:px-6 [&>td]:min-w-[120px] hover:bg-gray-100 duration-300 group cursor-pointer">
      <td className="border-y border-collapse border-slate-200 w-full">
        <div className="flex">
          <div>
            <img className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 text-sm ease-soft-in-out h-9 w-9 object-cover rounded-xl" src={getCategory.image} alt={getCategory.name} />
          </div>
          <div className="flex flex-col justify-center">
            <h6 className="mb-0 leading-normal text-gray-600 text-sm capitalize">{getCategory.name}</h6>
          </div>
        </div>
      </td>

      <td className="font-semibold border-y border-collapse border-slate-200">
        <span className="my-2 leading-tight text-xs">{getCategory.created_at}</span>
      </td>

      <td className="font-semibold border-y border-collapse border-slate-200">
        <span className="my-2 leading-tight text-xs">{category.dishes?.data.length}</span>
      </td>

      <td className="font-semibold border-y border-collapse border-slate-200">
        <div className="flex items-center gap-2">
          {Object.keys(category.translates).map(el => (
            <span
              className="relative uppercase shadow-sm rounded-full h-6 w-6 bg-gradient-to-tl from-purple-700 to-pink-500 text-white font-bold text-[0.6em] flex items-center justify-center" 
              key={el}>
              {el}
            </span>
          ))}
        </div>
      </td>

      <td className="font-semibold border-y border-collapse border-slate-200 opacity-0 group-hover:opacity-100 duration-300">
        <div className="flex items-center justify-end gap-2">
          <TableActionBtn icon={<EditIcon />} onClick={() => handleEdit(category)} />
          <TableActionBtn icon={<TrashIcon />} onClick={() => handleDestroy(category.id)} />
        </div>
      </td>
    </tr>
  )
}

export default CategoryList

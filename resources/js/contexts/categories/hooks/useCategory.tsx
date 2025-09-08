import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCategoryStore } from '@/contexts/categories/stores/categoryStore'
import { Category, CategoryForm, LocalImage } from '@/contexts/categories/libs/types'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import useForm from '@/contexts/shared/hooks/useForm'

const useCategory = () => {
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const { loading } = useCategoryStore()
  const navigate = useNavigate()
  const params = useParams()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const id = parseInt(params.id || '')

  const { values, errors, renderErrors, handleSubmit, setFormValues } = useForm<CategoryForm>({})

  const [category] = useState<Category>()
  const [updating, setUpdating] = useState<boolean>(false)
  const [image, setImage] = useState<LocalImage>({ preview: '' })

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...')
    }

    fetchData()
  }, [id])

  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        showAlert(t('El archivo debe ser una imagen.'), 'error')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImage({
          preview: reader.result as string,
          file,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleResetImage = () => {
    setImage({
      preview: category?.image || '',
    })
  }

  const handleField = <K extends keyof CategoryForm>(field: K, value: CategoryForm[K]) => {
    setFormValues({
      ...values,
      [field]: value,
    })
  }

  const submitForm = async (formData: CategoryForm) => {
    if (!formData) return

    try {
      setUpdating(true)

      // const message = id
      //   ? await updateCategory({ ...formData, file: image.file })
      //   : await saveCategory({ ...formData, file: image.file })

      if (!id) return navigate('/dashboard/categories')

      // showAlert(t(message), 'success')
    } finally {
      setUpdating(false)
    }
  }

  const handleDestroy = async (id: number | undefined) => {
    if (id) {
      showAlert(t('dashboard.categories.destroy'), 'warning', () => destroyCat(id))
    }
  }

  const destroyCat = async (id: number) => {
    // await destroyCategory(id)
    console.log(id)
    return navigate('/dashboard/categories')
  }

  return {
    category,
    loading,
    updating,
    image,
    errors,
    fileInputRef,
    form: values,
    handleDestroy,
    handleImageClick,
    handleResetImage,
    handleImageChange,
    handleField,
    handleSubmit,
    renderErrors,
    submitForm,
  }
}

export default useCategory

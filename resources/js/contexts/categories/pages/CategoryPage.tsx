import Layout from '@/contexts/shared/components/Layout'
import useCategory from '@/contexts/categories/hooks/useCategory'
import useCategoryTranslated from '@/contexts/categories/hooks/useCategoryTranslated'
import { TrashIcon } from '@/contexts/shared/components/Icons'
import { useTranslation } from 'react-i18next'
import { BaseButton } from '@/contexts/shared/components/Button'

const CategoriesPage = () => {
  const { t } = useTranslation()

  const {
    category,
    form,
    updating,
    image,
    fileInputRef,
    errors,
    handleImageClick,
    handleResetImage,
    handleImageChange,
    handleDestroy,
    handleField,
    handleSubmit,
    submitForm,
    renderErrors,
  } = useCategory()

  const getCat = useCategoryTranslated(category)

  return (
    form &&
    category && (
      <Layout pageTitle={t('dashboard.categories.title')}>
        <div className="-mx-3 flex flex-wrap">
          <div className="lg:flex-0 w-full max-w-full shrink-0 px-3 lg:w-6/12">
            <h4>
              {category.id
                ? t('dashboard.categories.h4', { category: getCat?.name })
                : t('dashboard.categories.h4.new')}
            </h4>
            <p>{t('dashboard.categories.p', { category: getCat?.name })}</p>
          </div>
        </div>

        <div className="-mx-3 mt-6 flex flex-wrap">
          <div className="lg:flex-0 w-full max-w-full shrink-0 px-3 lg:w-4/12">
            <div className="shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 bg-white bg-clip-border">
              <div className="flex-auto p-6">
                <h5 className="mb-4 font-bold">{t('dashboard.categories.image.h5')}</h5>
                <div className="-mx-3 flex flex-wrap px-3">
                  <div className="flex-0 group relative mb-2 w-full max-w-full">
                    <button
                      className="absolute start-0 top-0 hidden h-full w-full rounded-xl bg-gray-900 bg-opacity-75 text-xl text-white group-hover:block"
                      onClick={handleImageClick}
                    >
                      {t('dashboard.categories.image.hover')}
                    </button>
                    <img
                      className="shadow-soft-3xl aspect-square w-full rounded-xl object-cover"
                      src={image.preview}
                      alt="product_image"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>

                  {image.file && (
                    <BaseButton
                      variant="secondary"
                      icon={<TrashIcon className="text-lg" />}
                      title={t('dashboard.categories.image.reset')}
                      onClick={handleResetImage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex-0 mt-6 w-full max-w-full shrink-0 px-3 lg:mt-0 lg:w-8/12">
            <div className="shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 bg-white bg-clip-border">
              <div className="flex-auto p-6">
                <h5 className="font-bold">{t('dashboard.categories.form.h5')}</h5>

                <div className="flex items-center gap-2"></div>

                <div className="-mx-3 flex flex-wrap">
                  <div className="flex-0 w-full max-w-full px-3">
                    <label
                      className="mb-2 ml-1 mt-6 text-xs font-bold text-slate-700"
                      htmlFor="category_name"
                    >
                      {t('dashboard.categories.form.name')}
                    </label>
                    <input
                      type="text"
                      name="category_name"
                      value={form.name}
                      onChange={ev => handleField('name', ev.currentTarget.value)}
                      className="focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                    />
                    {renderErrors('name', errors)}
                  </div>
                </div>

                <div className="-mx-3 flex flex-wrap">
                  <div className="flex-0 w-full max-w-full px-3">
                    <label
                      className="mb-2 ml-1 mt-6 text-xs font-bold text-slate-700"
                      htmlFor="category_descr"
                    >
                      {t('dashboard.categories.form.descr')}
                    </label>
                    <textarea
                      value={form.description}
                      onChange={ev => handleField('description', ev.currentTarget.value)}
                      className="focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      name="category_descr"
                      id="category_descr"
                    ></textarea>
                    {renderErrors('description', errors)}
                  </div>
                </div>

                <div className="flex-0 mt-6 w-full max-w-full">
                  <div className="flex">
                    <BaseButton
                      variant="primary"
                      loading={updating}
                      title={t('dashboard.categories.form.save')}
                      onClick={() => handleSubmit(() => submitForm(form))}
                    />

                    {category.id && (
                      <BaseButton
                        variant="secondary"
                        title={t('dashboard.categories.form.delete')}
                        icon={<TrashIcon className="text-base" />}
                        onClick={() => handleDestroy(category.id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  )
}

export default CategoriesPage

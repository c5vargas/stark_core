import Layout from "@/contexts/shared/components/Layout";
import useCategory from "@/contexts/categories/hooks/useCategory";
import useCategoryTranslated from "@/contexts/categories/hooks/useCategoryTranslated";
import { TrashIcon } from "@/contexts/shared/components/Icons";
import { useTranslation } from "react-i18next";
import { ButtonPrimary, ButtonSecondary } from "@/contexts/shared/components/Button";

const CategoriesPage = () => {
  const { t } = useTranslation();

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
    renderErrors
  } = useCategory();
  
  const getCat = useCategoryTranslated(category);
  
	return form && category && (
    <Layout pageTitle={t('dashboard.categories.title')}>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full px-3 shrink-0 lg:flex-0 lg:w-6/12">
          <h4>{ category.id 
            ? t('dashboard.categories.h4', {category: getCat?.name})
            : t('dashboard.categories.h4.new')
          }</h4>
          <p>{ t('dashboard.categories.p', {category: getCat?.name}) }</p>
        </div>
      </div>

      <div className="flex flex-wrap mt-6 -mx-3">
        <div className="w-full max-w-full px-3 shrink-0 lg:flex-0 lg:w-4/12">
          <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-6">
              <h5 className="font-bold mb-4">{t('dashboard.categories.image.h5')}</h5>
              <div className="flex flex-wrap px-3 -mx-3">
                <div className="relative w-full max-w-full flex-0 group mb-2">
                  <button className="hidden group-hover:block w-full top-0 start-0 h-full absolute bg-gray-900 text-white rounded-xl text-xl bg-opacity-75" onClick={handleImageClick}>
                    {t('dashboard.categories.image.hover')}
                  </button>
                  <img className="w-full rounded-xl shadow-soft-3xl aspect-square object-cover" src={image.preview} alt="product_image" />
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />
                </div>

                { image.file && <ButtonSecondary icon={<TrashIcon className="text-lg" />} title={t('dashboard.categories.image.reset')} onClick={handleResetImage} /> }
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full px-3 mt-6 shrink-0 lg:flex-0 lg:w-8/12 lg:mt-0">
          <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-6">
              <h5 className="font-bold">{t('dashboard.categories.form.h5')}</h5>

              <div className="flex gap-2 items-center">
                 
                </div>


              <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                  <label className="mt-6 mb-2 ml-1 font-bold text-xs text-slate-700" htmlFor="category_name">{t('dashboard.categories.form.name')}</label>
                  <input type="text" name="category_name" value={form.name} onChange={(ev) => handleField('name', ev.currentTarget.value)} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                  {renderErrors('name', errors)}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                  <label className="mt-6 mb-2 ml-1 font-bold text-xs text-slate-700" htmlFor="category_descr">{t('dashboard.categories.form.descr')}</label>
                  <textarea value={form.description} onChange={(ev) => handleField('description', ev.currentTarget.value)} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" name="category_descr" id="category_descr"></textarea>
                  {renderErrors('description', errors)}
                </div>
              </div>

              <div className="w-full max-w-full mt-6 flex-0">
                <div className="flex">
                  <ButtonPrimary loading={updating} title={t('dashboard.categories.form.save')} onClick={() => handleSubmit(() => submitForm(form))} />

                  { category.id && 
                    <ButtonSecondary title={t('dashboard.categories.form.delete')} icon={<TrashIcon className="text-base" />} onClick={() => handleDestroy(category.id)} /> 
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
	);
}

export default CategoriesPage

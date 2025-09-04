import Layout from "@/contexts/shared/components/Layout";
import TableOutsideActions from "@/contexts/shared/components/table/TableOutsideActions";
import CategoryList from "@/contexts/categories/components/CategoryList";
import useCategories from "@/contexts/categories/hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLng } from "@/i18n";

const CategoriesPage = () => {
  const { categories, fetchCategories, setQuery, loading } = useCategories();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onCreate = () => {
    navigate(`/dashboard/categories/new`);
  };

	return (
    <Layout pageTitle={t('dashboard.users')}>
      <TableOutsideActions onCreate={onCreate} addBtnLabel={t('dashboard.users.create')} onSearch={setQuery} />

      <p>{getLng()}</p>

      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full flex-0">
          <div className="bg-white border-0 shadow-xl rounded-2xl">
            <CategoryList elements={categories} loading={loading} onUpdate={fetchCategories} />
          </div>
        </div>
      </div>
    </Layout>
	);
}

export default CategoriesPage

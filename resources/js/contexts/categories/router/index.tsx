import { lazy } from "react";

const CategoriesPage = lazy(() => import("@/contexts/categories/pages/CategoriesPage"));
const CategoryPage = lazy(() => import("@/contexts/categories/pages/CategoryPage"));

const router = {
	path: "categories",
	children: [
		{
			index: true,
			element: <CategoriesPage />
		},
    {
			path: ':id',
			element: <CategoryPage />
		},
	]
}

export default router

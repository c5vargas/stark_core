import { useEffect, useMemo, useState } from "react"
import { useCategoryStore } from "@/contexts/categories/stores/categoryStore"
import useCategoryTranslated from "./useCategoryTranslated";

const useCategories = () => {
	const [query, setQuery] = useState<string>('');
	const { categories, loading, getCategories } = useCategoryStore()

	useEffect(() => {
		fetchCategories();
	}, []);

	const filteredCategories = useMemo(() => 
		categories.filter(category => {
			const cat = useCategoryTranslated(category)
			return (cat?.name || '').toLowerCase().includes(query.toLowerCase())
		}
			
		), [query, categories]
	);

	const fetchCategories = () => {
		getCategories('dishes');
	};

	return {
		categories: filteredCategories,
		loading,
		query,
		setQuery,
    	fetchCategories
	}
}

export default useCategories

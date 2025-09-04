import { getLng } from "@/i18n";
import { Category } from "../libs/types";

const useCategoryTranslated = (category: Category | undefined) => {
	const locale = getLng();

	if(!category || !category.translates)
		return null

	const translatedElement = category.translates[locale];
	const fallbackElement = Object.values(category.translates)[0];

	return {
		id: category.id,
		image: category.image,
		created_at: category.created_at,
		updated_at: category.updated_at,
		name: translatedElement ? translatedElement.name : fallbackElement.name,
		description: translatedElement ? translatedElement.description : fallbackElement.description,
	}
}

export default useCategoryTranslated
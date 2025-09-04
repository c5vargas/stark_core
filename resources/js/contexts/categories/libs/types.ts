import { Dish } from "@/contexts/dishes/libs/types";

export interface Category {
  id?: number;
  image?: string;
  translates: { [language: string]: CategoryTranslation };
  created_at?: string;
	updated_at?: string;

	dishes?: {
		data: Dish[]
	};
}

export interface CategoryTranslation {
  id?: number;
  language?: string;
  name?: string;
  description?: string;
}

export interface CategoryForm {
  id?: number;
  file?: File;
  language?: string;
  name?: string;
  description?: string;
}

export interface LocalImage {
  preview: string,
  file?: File
}

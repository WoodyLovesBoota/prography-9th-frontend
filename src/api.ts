import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/";

export const getCategories = async () => {
  return await axios.get(`${BASE_URL}json/v1/1/categories.php`).then((res) => res.data);
};

export const getFoods = async (keyword: string) => {
  return await axios.get(`${BASE_URL}json/v1/1/filter.php?c=${keyword}`).then((res) => res.data);
};

export interface ICategories {
  categories: ICategory[];
}

export interface IMeals {
  meals: IMeal[];
}

export interface ICategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface IMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

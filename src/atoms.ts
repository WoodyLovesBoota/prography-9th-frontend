import { atom } from "recoil";

export const cockTailState = atom({
  key: "currentCocktail",
  default: "",
});

export const selectedCategoryState = atom<string[]>({
  key: "SelectedCategory",
  default: [],
});

export const gridState = atom<number>({
  key: "gridNumberState",
  default: 4,
});

export const filterState = atom<string>({
  key: "filterState",
  default: "default",
});

import {appendAuthParams} from '@helpers';

export const randomRecipeUrl = appendAuthParams(`/recipes/random?number=1`);

export const searchRecipeUrl = (query: string, number: number) =>
  appendAuthParams(`/recipes/complexSearch?query=${query}&number=${number}`);

export const getRecipeByIdUrl = (id: number) =>
  appendAuthParams(`/recipes/${id}/information?includeNutrition=false`);

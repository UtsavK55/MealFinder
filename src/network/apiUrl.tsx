import {appendAuthParams} from '@helpers';
import {EMAIl} from './apiContants';

export const randomRecipeUrl = appendAuthParams(`/recipes/random?number=1`);

export const searchRecipeUrl = (query: string, number: number) =>
  appendAuthParams(`/recipes/complexSearch?query=${query}&number=${number}`);

export const getRecipeByIdUrl = (id: number) =>
  appendAuthParams(`/recipes/${id}/information?includeNutrition=false`);

export const getUserDataUrl = appendAuthParams(
  `/users/connect?username=${EMAIl}`,
);

export const mealPlanUrl = (username: string, hash: string, date: string) =>
  appendAuthParams(`/mealplanner/${username}/day/${date}?hash=${hash}`);

export const addMealToPlanUrl = (username: string, hash: string) =>
  appendAuthParams(`/mealplanner/${username}/items?hash=${hash}`);

export const deleteMealFromPlanUrl = (
  username: string,
  hash: string,
  id: number,
) => appendAuthParams(`/mealplanner/${username}/items/${id}?hash=${hash}`);

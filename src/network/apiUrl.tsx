import {appendAuthParams} from '@helpers';

export const randomRecipeUrl = appendAuthParams(`/recipes/random?number=10`);

export const searchRecipeUrl = (query: string, number: number) =>
  appendAuthParams(`recipes/complexSearch?query=${query}&number=${number}`);

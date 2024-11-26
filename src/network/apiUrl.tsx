import {appendAuthParams} from '@helpers';

export const randomRecipeUrl = (type: string) =>
  appendAuthParams(`/recipes/random?number=10&type=${type}`);

import {appendAuthParams} from '@helpers';

export const randomRecipeUrl = appendAuthParams(`/recipes/random?number=10`);

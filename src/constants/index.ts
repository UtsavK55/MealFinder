export const STORAGE_KEYS = {
  DARK_MODE: 'darkMode',
};
export const ROUTES = {
  BOTTOM_TAB: {
    HOME: 'HOME',
    MEAL_PLANNER: 'MEAL_PLANNER',
    FAVOURITES: 'FAVOURITES',
  },
  HOME_STACK_SCREEN: {
    HOME_SCREEN: 'HOME_SCREEN',
    SEARCH_SCREEN: 'SEARCH_SCREEN',
    DETAILS_SCREEN: 'DETAILS_SCREEN',
  },
  MEAL_PLANNER__STACK_SCREEN: {
    MEAL_PLANNER_SCREEN: 'MEAL_PLANNER_SCREEN',
  },
} as const;

export const bottomTabLabels: {[key: string]: string} = {
  HOME: 'Home',
  MEAL_PLANNER: 'Meal Plan',
  FAVOURITES: 'Favorites',
};

export const randomRecipeTypes = ['appetizer', 'main course', 'dessert'];

export const cuisines = [
  'african',
  'asian',
  'american',
  'british',
  'cajun',
  'caribbean',
  'chinese',
  'eastern european',
  'european',
  'french',
  'german',
  'greek',
  'indian',
  'irish',
  'italian',
  'japanese',
  'jewish',
  'korean',
  'latin american',
  'mediterranean',
  'mexican',
  'middle eastern',
  'nordic',
  'southern',
  'spanish',
  'thai',
  'vietnamese',
];

export const diets = [
  'gluten free',
  'ketogenic',
  'lacto-vegetarian',
  'ovo-vegetarian',
  'vegan',
  'pescetarian',
  'paleo',
  'primal',
  'whole30',
];

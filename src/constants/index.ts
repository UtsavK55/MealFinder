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
  'African',
  'Asian',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
];

export const diets = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
  'Low FODMAP',
  'Whole30',
];

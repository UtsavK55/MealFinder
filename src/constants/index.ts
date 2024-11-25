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

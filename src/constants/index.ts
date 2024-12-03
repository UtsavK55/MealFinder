export const STORAGE_KEYS = {
  DARK_MODE: 'darkMode',
  USER_DATA: 'userData',
  FAVOURITE: 'favourite',
};
export const ROUTES = {
  BOTTOM_TAB: {
    HOME: 'HOME',
    MEAL_PLANNER: 'MEAL_PLANNER',
    FAVOURITES: 'FAVOURITES',
  },
  HOME_STACK_SCREEN: {
    HOME_SCREEN: 'HOME_SCREEN',
    SEARCH_RECIPE_SCREEN: 'SEARCH_RECIPE_SCREEN',
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
export const mealTypes = [
  {mealId: 1, mealName: 'Breakfast'},
  {mealId: 2, mealName: 'Lunch'},
  {mealId: 3, mealName: 'Dinner'},
];

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

export const recipeDetailTabs = ['Information', 'Ingredients', 'Instructions'];

export const emptyRecipeDetail: RecipeDetail = {
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  preparationMinutes: null,
  cookingMinutes: null,
  id: 0,
  title: '',
  readyInMinutes: 0,
  servings: 0,
  image: '',
  summary: '',
  instructions: [
    {
      number: 0,
      step: '',
    },
  ],
  extendedIngredients: [
    {
      id: 0,
      image: '',
      original: '',
    },
  ],
};

export const emptyMealPlanQuotes = [
  'Get energized by grabbing a breakfast 🌞✨',
  'All you need is some Lunch 🍟🍜',
  'An early dinner can help you sleep better 🍛😴',
];

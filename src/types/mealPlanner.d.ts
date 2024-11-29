interface CalendarStripProps {
  selectedDate: Date;
  onDayPress?: (date: any) => void;
}

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onPressBack: () => void;
}

interface Ingredient {
  id: number;
  image: string;
  original: string;
}

interface Instruction {
  number: number;
  step: string;
}

interface RecipeDetail {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  summary: string;
  instructions: Instruction[];
  extendedIngredients: Ingredient[];
}

interface MealPlanDetail {
  slot: number;
  value: RecipeCard;
}

type AllMealPlans = MealPlanDetail[];

interface DateContext {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

interface MealPlanSectionProps {
  mealId: number;
  mealName: string;
  onPressAdd: (id: number) => void;
  mealData: AllRecipeCards;
  timestamp: number;
  isLoading: boolean;
}

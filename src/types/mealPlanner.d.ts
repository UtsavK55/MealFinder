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

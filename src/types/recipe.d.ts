interface RecipeCard {
  id: number;
  title: string;
  image: string;
  vegetarian?: boolean;
}

type AllRecipeCards = RecipeCard[];

interface HorizontalScrollProps {
  sectionTitle?: string;
  data: AllRecipeCards;
  isLarge?: boolean;
  fromScreen: string;
  mealId?: number;
  selectedDate?: number;
}

interface FiltersProps {
  selectedCuisine: string | null;
  selectedDiet: string | null;
  isVegetarian: boolean;
  onSelectCuisine: (cuisine: string) => void;
  onSelectDiet: (diet: string) => void;
  onToggleVegetarian: (value: boolean) => void;
}

interface FilterSectionProps {
  title: string;
  options: string[];
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
}

interface RecipeCardProps {
  item: RecipeCard;
  large?: boolean;
  onPressCard?: () => void;
  onPressFavorite?: () => void;
}

interface RecipeListSectionProps {
  appetizers: AllRecipeCards;
  mainCourse: AllRecipeCards;
  desserts: AllRecipeCards;
}

interface TabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: Dispatch<SetStateAction<number>>;
  recipeInfo: RecipeDetail;
}

interface TabContentProps {
  activeTab: number;
  recipeInfo: RecipeDetail;
}

interface RecipeCard {
  id: number;
  title: string;
  image: string;
  vegetarian: boolean;
}

type AllRecipeCards = RecipeCard[];

interface HorizontalScrollProps {
  sectionTitle: string;
  data: AllRecipeCards;
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

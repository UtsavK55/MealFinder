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

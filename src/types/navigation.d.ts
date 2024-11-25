import {ROUTES} from '@constants';

declare global {
  type BottomTabScreenNames = keyof typeof ROUTES.BOTTOM_TAB;
  type BottomTabScreenParamList = Record<BottomTabScreenNames, undefined>;
  type BottomTabNavigationType = NavigationProp<BottomTabScreenParamList>;

  type HomeScreenNames = keyof typeof ROUTES.HOME_STACK_SCREEN;
  type HomeScreenParamList = Record<HomeScreenNames, undefined>;
  type HomeScreenNavigationType = NavigationProp<HomeScreenParamList>;

  type MealPlannerScreenNames = keyof typeof ROUTES.MEAL_PLANNER__STACK_SCREEN;
  type MealPlannerScreenParamList = Record<MealPlannerScreenNames, undefined>;
  type MealPlannerScreenNavigationType =
    NavigationProp<MealPlannerScreenParamList>;
}

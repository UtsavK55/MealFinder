import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '@constants';
import MealPlanner from '@screens/mealPlanner/MealPlanner';

const MealPlannerStackScreen = () => {
  const MealPlannerStack =
    createNativeStackNavigator<MealPlannerScreenParamList>();

  return (
    <MealPlannerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MealPlannerStack.Screen
        name={ROUTES.MEAL_PLANNER__STACK_SCREEN.MEAL_PLANNER_SCREEN}
        component={MealPlanner}
      />
    </MealPlannerStack.Navigator>
  );
};
export default MealPlannerStackScreen;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ROUTES} from '@constants';
import Favourites from '@screens/favourites/Favourites';

import HomeStackScreen from './HomeStackScreen';
import MealPlannerStackScreen from './MealPlannerStackScreen';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator<BottomTabScreenParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={ROUTES.BOTTOM_TAB.HOME} component={HomeStackScreen} />
      <Tab.Screen
        name={ROUTES.BOTTOM_TAB.MEAL_PLANNER}
        component={MealPlannerStackScreen}
      />
      <Tab.Screen name={ROUTES.BOTTOM_TAB.FAVOURITES} component={Favourites} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

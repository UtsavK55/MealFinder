import {useLayoutEffect} from 'react';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ROUTES} from '@constants';
import Home from '@screens/home/Home';
import MealDetails from '@screens/mealDetails/MealDetails';
import SearchRecipe from '@screens/searchRecipe/SearchRecipe';

const HomeStack = createNativeStackNavigator<HomeScreenParamList>();

const HomeStackScreen = () => {
  const tabNavigation = useNavigation<BottomTabNavigationType>();
  const route = useRoute<RouteProp<HomeScreenParamList>>();

  useLayoutEffect(() => {
    const routeName =
      getFocusedRouteNameFromRoute(route) ??
      ROUTES.HOME_STACK_SCREEN.HOME_SCREEN;

    const shouldHideTabBar =
      routeName === ROUTES.HOME_STACK_SCREEN.SEARCH_RECIPE_SCREEN ||
      routeName === ROUTES.HOME_STACK_SCREEN.DETAILS_SCREEN;

    tabNavigation.setOptions({
      tabBarStyle: {
        display: shouldHideTabBar ? 'none' : 'flex',
      },
    });
  }, [tabNavigation, route]);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name={ROUTES.HOME_STACK_SCREEN.HOME_SCREEN}
        component={Home}
      />
      <HomeStack.Screen
        name={ROUTES.HOME_STACK_SCREEN.DETAILS_SCREEN}
        component={MealDetails}
      />
      <HomeStack.Screen
        name={ROUTES.HOME_STACK_SCREEN.SEARCH_RECIPE_SCREEN}
        component={SearchRecipe}
        options={{animation: 'fade_from_bottom'}}
      />
    </HomeStack.Navigator>
  );
};
export default HomeStackScreen;

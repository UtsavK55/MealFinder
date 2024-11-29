import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import BaseContainer from '@components/baseContainer';
import NoDataFound from '@components/noDataFound';
import RecipeCard from '@components/recipeCard';
import Loader from '@components/loader';
import {ROUTES} from '@constants';
import {isAndroid} from '@helpers';
import {fetchData} from '@network/apiMethods';
import {randomRecipeUrl, searchRecipeUrl} from '@network/apiUrl';
import {useThemeColors} from '@theme';

import {searchStyles} from './styles';

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  onPressBack,
}: SearchInputProps) => {
  const styles = searchStyles();
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressBack}>
        <Icon
          name={'arrow-back'}
          color={colors.gray800}
          size={24}
          style={styles.icon}
        />
      </Pressable>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchPlaceholder}
        placeholder="Search by recipe or ingredient"
        placeholderTextColor={colors.gray600}
        autoFocus
      />
    </View>
  );
};

const SearchRecipe = () => {
  const styles = searchStyles();
  const homeNavigation = useNavigation<HomeScreenNavigationType>();
  const bottomtabNavigation = useNavigation<BottomTabNavigationType>();
  const route =
    useRoute<RouteProp<HomeScreenParamList, 'SEARCH_RECIPE_SCREEN'>>();
  const {mealId, selectedDate, fromScreen} = route?.params;

  const [searchedRecipes, setSearchedRecipes] = useState<AllRecipeCards>([]);
  const [randomRecipes, setRandomRecipes] = useState<AllRecipeCards>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setisLoading] = useState(false);

  const fetchRandomRecipes = async () => {
    const randomdata = await fetchData(randomRecipeUrl);
    const randomRecipeData = randomdata?.recipes?.map(
      ({id, title, image}: RecipeCard) => ({
        id,
        title,
        image,
      }),
    );
    setRandomRecipes(randomRecipeData);
  };

  const fetchSearchedRecipes = async () => {
    const searchData = await fetchData(searchRecipeUrl(searchTerm, 10));
    const searchRecipeData = searchData?.results?.map(
      ({id, title, image}: RecipeCard) => ({
        id,
        title,
        image,
      }),
    );
    setSearchedRecipes(searchRecipeData);
  };

  const getAllData = async () => {
    setisLoading(true);
    if (searchTerm.length === 0) {
      await fetchRandomRecipes();
    } else {
      await fetchSearchedRecipes();
    }
    setisLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, [searchTerm]);

  const onPressBack = () => {
    if (fromScreen === ROUTES.HOME_STACK_SCREEN.HOME_SCREEN) {
      homeNavigation.goBack();
    } else {
      bottomtabNavigation.dispatch(
        CommonActions.reset({
          routes: [{name: ROUTES.BOTTOM_TAB.MEAL_PLANNER}],
        }),
      );
    }
  };

  const onPressCard = (recipeId: number) => {
    if (fromScreen === ROUTES.HOME_STACK_SCREEN.HOME_SCREEN) {
      homeNavigation.navigate(ROUTES.HOME_STACK_SCREEN.DETAILS_SCREEN, {
        recipeId,
      });
    } else {
      homeNavigation.navigate(ROUTES.HOME_STACK_SCREEN.DETAILS_SCREEN, {
        mealId,
        selectedDate,
        recipeId,
      });
    }
  };

  return (
    <BaseContainer>
      <KeyboardAvoidingView behavior={isAndroid ? 'height' : 'padding'}>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onPressBack={onPressBack}
        />
        {isLoading ? (
          <Loader style={styles.loader} />
        ) : (
          <FlatList
            data={searchTerm.length === 0 ? randomRecipes : searchedRecipes}
            renderItem={({item}) => (
              <RecipeCard
                item={item}
                onPressCard={() => onPressCard(item?.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.recipeList}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListEmptyComponent={<NoDataFound item="recipe" />}
          />
        )}
      </KeyboardAvoidingView>
    </BaseContainer>
  );
};

export default SearchRecipe;

import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import BaseContainer from '@components/baseContainer';
import RecipeCard from '@components/recipeCard';
import NoDataFound from '@components/noDataFound';
import Loader from '@components/loader';
import {ROUTES, STORAGE_KEYS} from '@constants';
import {getRecipeByIdUrl} from '@network/apiUrl';
import {fetchData} from '@network/apiMethods';
import {getData} from '@storage';
import {useThemeColors} from '@theme';

import {favoritesScreenStyles} from './styles';

const Favourites = () => {
  const isFocused = useIsFocused();
  const styles = favoritesScreenStyles();
  const colors = useThemeColors();
  const homeNavigation = useNavigation<HomeScreenNavigationType>();

  const [favorites, setFavorites] = useState<AllRecipeCards>([]);
  const [inFavorites, setInFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getFavorites = useCallback(async () => {
    setIsLoading(true);
    const favoriteIds = (await getData(STORAGE_KEYS.FAVOURITE)) || [];

    const favoriteRecipes = await Promise.all(
      favoriteIds.map(async (recipeId: number) => {
        const recipeData = await fetchData(getRecipeByIdUrl(recipeId));
        const {id, title, image} = recipeData;
        return {id, title, image};
      }),
    );
    setFavorites(favoriteRecipes);
    setIsLoading(false);
  }, [isFocused, inFavorites]);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const onPressCard = (recipeId: number) => {
    homeNavigation.navigate(ROUTES.BOTTOM_TAB.HOME, {
      screen: ROUTES.HOME_STACK_SCREEN.DETAILS_SCREEN,
      params: {
        recipeId,
        fromScreen: ROUTES.BOTTOM_TAB.FAVOURITES,
      },
    });
  };

  return (
    <BaseContainer>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <RecipeCard
              item={item}
              large={false}
              onPressCard={() => onPressCard(item?.id)}
              inFavorites={inFavorites}
              setInFavorites={setInFavorites}
            />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <NoDataFound item="recipe" style={styles.noData} />
          }
        />
      )}
    </BaseContainer>
  );
};

export default Favourites;

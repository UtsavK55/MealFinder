import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import BaseContainer from '@components/baseContainer';
import Filters from '@components/filters';
import HorizontalScroll from '@components/horizontalScroll';
import {randomRecipeTypes, ROUTES} from '@constants';
import {fetchData} from '@network/apiMethods';
import {randomRecipeUrl} from '@network/apiUrl';
import {useThemeColors} from '@theme';

import {homeStyles} from './styles';

const Home = () => {
  const styles = homeStyles();
  const colors = useThemeColors();
  const homeNavigation = useNavigation<HomeScreenNavigationType>();

  const [appetizers, setAppetizers] = useState<AllRecipeCards>([]);
  const [mainCourse, setMainCourse] = useState<AllRecipeCards>([]);
  const [desserts, setDesserts] = useState<AllRecipeCards>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);

  const getAllData = async () => {
    randomRecipeTypes.map(async type => {
      let includeTags = [];
      let url = randomRecipeUrl;
      if (isVegetarian) {
        includeTags.push('vegetarian');
      }
      if (selectedDiet) {
        includeTags.push(selectedDiet);
      }
      includeTags.push(type);
      if (selectedCuisine) {
        includeTags.push(selectedCuisine);
      }
      url += `&include-tags=${includeTags.toString()}`;
      const data = await fetchData(url);
      console.log(url);

      const recipeData = data?.recipes?.map(
        ({id, title, image, vegetarian}: RecipeCard) => ({
          id,
          title,
          image,
          vegetarian,
        }),
      );

      if (type === randomRecipeTypes[0]) {
        setAppetizers(recipeData);
      } else if (type === randomRecipeTypes[1]) {
        setMainCourse(recipeData);
      } else {
        setDesserts(recipeData);
      }
    });
  };

  useEffect(() => {
    getAllData();
  }, [selectedCuisine, selectedDiet, isVegetarian]);

  const handleSelectCuisine = (cuisine: string) => {
    setSelectedCuisine(prevCuisine =>
      prevCuisine === cuisine ? null : cuisine,
    );
  };

  const handleSelectDiet = (diet: string) => {
    setSelectedDiet(prevDiet => (prevDiet === diet ? null : diet));
  };

  const handleToggleVegetarian = () => {
    setIsVegetarian(!isVegetarian);
  };

  const onPressSearch = () =>
    homeNavigation.navigate(ROUTES.HOME_STACK_SCREEN.SEARCH_SCREEN);

  return (
    <BaseContainer>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title1}>Welcome</Text>
          <Text style={styles.title2}>Find your recipe!</Text>
          <Pressable onPress={onPressSearch} style={styles.searchContainer}>
            <Text style={styles.searchPlaceholder}>
              Search by recipe or ingredient
            </Text>
            <Icon
              name="search"
              size={24}
              color={colors.white}
              style={styles.searchIcon}
            />
          </Pressable>
          <Filters
            selectedCuisine={selectedCuisine}
            selectedDiet={selectedDiet}
            isVegetarian={isVegetarian}
            onSelectCuisine={handleSelectCuisine}
            onSelectDiet={handleSelectDiet}
            onToggleVegetarian={handleToggleVegetarian}
          />
        </View>
        <HorizontalScroll data={appetizers} sectionTitle="Appetizers" />
        <HorizontalScroll data={mainCourse} sectionTitle="Main Course" />
        <HorizontalScroll data={desserts} sectionTitle="Desserts" />
      </ScrollView>
    </BaseContainer>
  );
};

export default Home;

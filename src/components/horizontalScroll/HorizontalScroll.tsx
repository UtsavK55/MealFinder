import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import NoDataFound from '@components/noDataFound';
import RecipeCard from '@components/recipeCard';
import {ROUTES} from '@constants';

import {horizontalScrollStyles} from './styles';

const HorizontalScroll = ({
  sectionTitle,
  data,
  isLarge,
  fromScreen,
  mealId,
  selectedDate,
}: HorizontalScrollProps) => {
  const styles = horizontalScrollStyles();
  const homeNavigation = useNavigation<HomeScreenNavigationType>();

  const onPressCard = (recipeId: number) => {
    if (fromScreen === ROUTES.HOME_STACK_SCREEN.HOME_SCREEN) {
      homeNavigation.navigate(ROUTES.HOME_STACK_SCREEN.DETAILS_SCREEN, {
        recipeId,
        fromScreen,
      });
    } else {
      homeNavigation.navigate(ROUTES.BOTTOM_TAB.HOME, {
        screen: ROUTES.HOME_STACK_SCREEN.DETAILS_SCREEN,
        params: {
          mealId,
          selectedDate: selectedDate,
          recipeId,
          fromScreen,
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      {sectionTitle && <Text style={styles.sectionTitle}>{sectionTitle}</Text>}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <RecipeCard
            item={item}
            large={isLarge}
            onPressCard={() => onPressCard(item?.id)}
          />
        )}
        keyExtractor={({id}) => id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<NoDataFound item="recipe" style={styles.noData} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default HorizontalScroll;

import React from 'react';
import {FlatList, Text, View} from 'react-native';

import NoDataFound from '@components/noDataFound';
import RecipeCard from '@components/recipeCard';

import {horizontalScrollStyles} from './styles';

const HorizontalScroll = ({sectionTitle, data}: HorizontalScrollProps) => {
  const styles = horizontalScrollStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <RecipeCard item={item} />}
        keyExtractor={({id}) => id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<NoDataFound item="recipe" />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default HorizontalScroll;

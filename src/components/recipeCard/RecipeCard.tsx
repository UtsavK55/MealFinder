import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {IMAGES} from '@constants/imageConstants';
import {truncateText} from '@helpers';
import {layout, useThemeColors} from '@theme';

import {recipeCardStyles} from './styles';

const RecipeCard = ({item}: {item: RecipeCard}) => {
  const styles = recipeCardStyles();
  const colors = useThemeColors();
  return (
    <Pressable style={styles.cardContainer}>
      <FastImage
        source={{
          uri: item?.image,
          priority: FastImage.priority.high,
        }}
        resizeMode="contain"
        defaultSource={IMAGES.logoImg1}
        style={styles.image}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{truncateText(item?.title, 35)}</Text>
          <Icon
            name="heart"
            size={28}
            color={colors.orange600}
            style={layout.flex_1}
          />
        </View>
        <Text
          style={[
            styles.info,
            {color: item?.vegetarian ? colors.green600 : colors.red500},
          ]}>
          {item?.vegetarian ? 'Veg' : 'Non-Veg'}
        </Text>
      </View>
    </Pressable>
  );
};

export default RecipeCard;

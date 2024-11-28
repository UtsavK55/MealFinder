import {Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {IMAGES} from '@constants/imageConstants';
import {truncateText} from '@helpers';
import {useThemeColors} from '@theme';

import {recipeCardStyles} from './styles';

const RecipeCard = ({item, large, onPressCard}: RecipeCardProps) => {
  const styles = recipeCardStyles();
  const colors = useThemeColors();

  const isVegStyles = [
    styles.info,
    {color: item?.vegetarian ? colors.green600 : colors.red500},
  ];

  return (
    <Pressable
      onPress={onPressCard}
      style={[
        styles.cardContainer,
        large ? styles.largeCard : styles.smallCard,
      ]}>
      <FastImage
        source={{
          uri: item?.image,
          priority: FastImage.priority.high,
        }}
        resizeMode="cover"
        defaultSource={IMAGES.logoImg1}
        style={styles.image}
      />
      <Pressable style={styles.icon}>
        <Icon name="heart" size={24} color={colors.red500} />
      </Pressable>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{truncateText(item?.title, 30)}</Text>
        {large && (
          <Text style={isVegStyles}>
            {item?.vegetarian ? 'Veg' : 'Non-Veg'}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default RecipeCard;

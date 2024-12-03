import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import {STORAGE_KEYS} from '@constants';
import {IMAGES} from '@constants/imageConstants';
import {truncateText} from '@helpers';
import {getData, storeData} from '@storage';
import {useThemeColors} from '@theme';

import {recipeCardStyles} from './styles';

const RecipeCard = ({
  item,
  large,
  onPressCard,
  inFavorites,
  setInFavorites,
}: RecipeCardProps) => {
  const isFocused = useIsFocused();
  const styles = recipeCardStyles();
  const colors = useThemeColors();

  const isVegStyles = [
    styles.info,
    {color: item?.vegetarian ? colors.green600 : colors.red500},
  ];

  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const getFavorite = async () => {
    const data = await getData(STORAGE_KEYS.FAVOURITE);
    setFavorites(data || []);
  };

  useEffect(() => {
    getFavorite();
  }, [isFocused]);

  useEffect(() => {
    const favorite = favorites.includes(item?.id);
    setIsFavorite(favorite);
  }, [favorites, item?.id]);

  const onPressFavoriteIcon = async (id: number) => {
    let updatedFavorites: number[];

    if (isFavorite) {
      updatedFavorites = favorites.filter(item => item !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    await storeData(updatedFavorites, STORAGE_KEYS.FAVOURITE);
    setIsFavorite(!isFavorite);
    if (setInFavorites) {
      setInFavorites(!inFavorites);
    }
  };

  return (
    <Pressable onPress={onPressCard} style={[styles.cardContainer]}>
      <FastImage
        source={{
          uri: item?.image,
          priority: FastImage.priority.high,
        }}
        resizeMode="cover"
        defaultSource={IMAGES.logoImg1}
        style={styles.image}
      />
      <Pressable
        style={styles.icon}
        onPress={() => onPressFavoriteIcon(item?.id)}>
        {isFavorite ? (
          <Icon name="heart" size={24} color={colors.red500} />
        ) : (
          <Icon name="heart-outline" size={24} color={colors.black} />
        )}
      </Pressable>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{truncateText(item?.title, 20)}</Text>
        {large && <Icon name="ellipse" size={16} style={isVegStyles} />}
      </View>
    </Pressable>
  );
};

export default RecipeCard;

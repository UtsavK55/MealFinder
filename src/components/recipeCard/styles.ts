import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';
import {layout} from '@theme';

export const recipeCardStyles = createThemedStyles((colors, scalingMetrics) => {
  const {wp, scaleSize, moderateScale} = scalingMetrics;
  return StyleSheet.create({
    cardContainer: {
      height: wp(60),
      marginHorizontal: scaleSize(10),
      backgroundColor: colors.gray50,
      borderRadius: scaleSize(10),
      width: wp(60),
      elevation: 8,
      shadowOpacity: 0.5,
      shadowRadius: 12,
      shadowColor: colors.gray800,
      shadowOffset: {width: scaleSize(8), height: scaleSize(8)},
    },
    image: {
      flex: 2,
      width: '100%',
      borderTopLeftRadius: scaleSize(10),
      borderTopRightRadius: scaleSize(10),
    },
    bottomContainer: {
      flex: 1,
      paddingHorizontal: scaleSize(10),
    },
    title: {
      fontSize: moderateScale(16),
      marginTop: scaleSize(10),
      fontWeight: 'bold',
      color: colors.black,
      flex: 6,
    },
    infoContainer: {
      ...layout.row,
      ...layout.itemsCenter,
    },
    info: {
      marginTop: scaleSize(5),
      fontWeight: '600',
      fontSize: moderateScale(14),
    },
  });
});

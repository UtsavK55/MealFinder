import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';

export const recipeCardStyles = createThemedStyles((colors, scalingMetrics) => {
  const {wp, scaleSize, moderateScale} = scalingMetrics;
  return StyleSheet.create({
    cardContainer: {
      marginHorizontal: scaleSize(10),
      marginBottom: scaleSize(30),
      backgroundColor: colors.gray50,
      borderRadius: scaleSize(10),
      elevation: 8,
      shadowOpacity: 0.5,
      shadowRadius: 12,
      shadowColor: colors.fixedGray800,
      shadowOffset: {width: scaleSize(8), height: scaleSize(8)},
      height: wp(45),
      width: wp(40),
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
      fontSize: moderateScale(14),
      marginTop: scaleSize(10),
      fontWeight: 'bold',
      color: colors.black,
      width: '80%',
    },
    info: {
      flex: 2,
      position: 'absolute',
      top: scaleSize(8),
      right: scaleSize(8),
      borderWidth: 1,
      padding: scaleSize(2),
      borderRadius: scaleSize(2),
      borderColor: colors.gray800,
    },
    icon: {
      position: 'absolute',
      top: scaleSize(10),
      right: scaleSize(10),
      backgroundColor: colors.white,
      padding: scaleSize(4),
      borderRadius: scaleSize(20),
      borderWidth: 2,
      borderColor: colors.gray800,
    },
  });
});

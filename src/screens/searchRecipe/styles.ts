import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';

export const searchStyles = createThemedStyles((colors, scalingMetrics) => {
  const {scaleSize, moderateScale} = scalingMetrics;
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.white,
      paddingHorizontal: scaleSize(12),
      marginVertical: scaleSize(10),
      paddingVertical: scaleSize(8),
      elevation: 8,
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowColor: colors.gray800,
      shadowOffset: {width: scaleSize(6), height: scaleSize(3)},
    },
    searchPlaceholder: {
      color: colors.black,
      justifyContent: 'center',
      fontSize: moderateScale(16),
      marginLeft: scaleSize(4),
      flex: 1,
    },
    icon: {
      padding: scaleSize(5),
    },
    recipeList: {
      paddingBottom: scaleSize(20),
      margin: scaleSize(20),
    },
  });
});

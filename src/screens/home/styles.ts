import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';

export const homeStyles = createThemedStyles((colors, scalingMetrics) => {
  const {hp, wp, scaleSize, moderateScale} = scalingMetrics;
  return StyleSheet.create({
    container: {padding: scaleSize(20)},
    title1: {
      color: colors.gray800,
      fontSize: moderateScale(18),
    },
    title2: {
      color: colors.black,
      fontSize: moderateScale(28),
      fontWeight: 'bold',
      paddingTop: scaleSize(4),
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.gray50,
      borderRadius: scaleSize(10),
      paddingHorizontal: scaleSize(12),
      marginTop: scaleSize(20),
      paddingVertical: scaleSize(8),
      elevation: 8,
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowColor: colors.fixedGray800,
      shadowOffset: {width: scaleSize(6), height: scaleSize(6)},
    },
    searchPlaceholder: {
      color: colors.gray600,
      justifyContent: 'center',
      fontSize: moderateScale(16),
      marginLeft: scaleSize(4),
    },
    searchIcon: {
      backgroundColor: colors.orange600,
      padding: 4,
      borderRadius: 5,
    },
  });
});

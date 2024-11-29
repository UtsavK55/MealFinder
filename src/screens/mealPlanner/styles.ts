import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';
import {layout} from '@theme';

export const mealPlannerStyles = createThemedStyles(
  (colors, scalingMetrics) => {
    const {scaleSize, moderateScale} = scalingMetrics;
    return StyleSheet.create({
      container: {
        paddingTop: 20,
      },
      sectionTitle: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: colors.black,
      },
      section: {
        ...layout.row,
        ...layout.justifyBetween,
        marginHorizontal: scaleSize(20),
        marginBottom: scaleSize(10),
      },
      screenTitle: {
        fontSize: moderateScale(24),
        fontWeight: '600',
        color: colors.black,
        marginHorizontal: scaleSize(20),
      },
      screenSubTitle: {
        marginBottom: scaleSize(20),
        marginHorizontal: scaleSize(20),
        color: colors.gray800,
      },
      icon: {
        position: 'absolute',
        top: scaleSize(10),
        right: scaleSize(20),
      },
      delete: {
        color: colors.red500,
        fontSize: moderateScale(14),
      },
    });
  },
);

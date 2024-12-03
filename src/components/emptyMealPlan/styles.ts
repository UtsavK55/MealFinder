import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';

export const emptyMealPlanStyles = createThemedStyles(
  (colors, scalingMetrics) => {
    const {scaleSize, moderateScale, wp} = scalingMetrics;
    return StyleSheet.create({
      text: {
        textAlign: 'center',
        paddingVertical: scaleSize(60),
        marginBottom: wp(7),
        marginTop: scaleSize(2),
        width: wp(90),
        marginHorizontal: wp(2),
        backgroundColor: colors.gray100,
        fontSize: moderateScale(14),
        borderRadius: scaleSize(25),
        color: colors.black,
      },
    });
  },
);

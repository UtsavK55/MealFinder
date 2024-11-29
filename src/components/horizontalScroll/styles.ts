import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';

export const horizontalScrollStyles = createThemedStyles(
  (colors, scalingMetrics) => {
    const {scaleSize, moderateScale, wp} = scalingMetrics;
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      sectionTitle: {
        marginBottom: scaleSize(10),
        fontSize: moderateScale(20),
        fontWeight: '600',
        marginHorizontal: scaleSize(20),
        color: colors.black,
      },
      list: {
        marginTop: scaleSize(10),
        paddingHorizontal: scaleSize(12),
      },
      noData: {
        textAlign: 'center',
        marginVertical: scaleSize(60),
        marginHorizontal: wp(35),
      },
    });
  },
);

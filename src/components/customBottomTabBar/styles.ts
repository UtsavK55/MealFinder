import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';

export const customBottomTabStyles = createThemedStyles(
  (colors, scalingMetrics) => {
    const {scaleSize, moderateScale} = scalingMetrics;
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray200,
        paddingBottom: scaleSize(5),
        paddingTop: scaleSize(10),
        elevation: 8,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: colors.fixedBlack,
        shadowOffset: {width: 0, height: -scaleSize(4)},
      },
      tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tabText: {
        fontSize: moderateScale(12),
        marginTop: scaleSize(4),
      },
    });
  },
);

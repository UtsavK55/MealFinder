import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';

export const favoritesScreenStyles = createThemedStyles(
  (colors, scalingMetrics) => {
    const {scaleSize, moderateScale, wp} = scalingMetrics;
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.white,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleSize(16),
        paddingVertical: scaleSize(12),
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
      },
      title: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: scaleSize(8),
      },
      listContainer: {
        padding: scaleSize(16),
        paddingTop: scaleSize(8),
      },
      emptyText: {
        fontSize: moderateScale(16),
        color: colors.gray600,
        textAlign: 'center',
        marginTop: scaleSize(32),
      },
      loadingText: {
        fontSize: moderateScale(16),
        color: colors.gray600,
        textAlign: 'center',
        marginTop: scaleSize(32),
      },
      noData: {
        textAlign: 'center',
        marginVertical: scaleSize(60),
      },
    });
  },
);

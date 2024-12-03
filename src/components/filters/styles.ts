import {createThemedStyles} from '@helpers';

export const filterStyles = createThemedStyles((colors, scalingMetrics) => {
  const {scaleSize, moderateScale} = scalingMetrics;
  return {
    title: {
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      marginBottom: scaleSize(10),
      color: colors.black,
      paddingHorizontal: scaleSize(20),
    },
    filterItem: {
      backgroundColor: colors.gray50,
      paddingHorizontal: scaleSize(12),
      paddingVertical: scaleSize(8),
      borderRadius: scaleSize(20),
      marginRight: scaleSize(10),
      marginBottom: scaleSize(10),
    },
    selectedItem: {
      backgroundColor: colors.orange600,
    },
    filterText: {
      color: colors.gray800,
      fontSize: moderateScale(14),
    },
    selectedText: {
      color: colors.white,
    },
    vegetarianContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: scaleSize(20),
      paddingHorizontal: scaleSize(20),
    },
    vegetarianText: {
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      color: colors.black,
    },
    scrollFilter: {
      paddingLeft: scaleSize(20),
    },
  };
});

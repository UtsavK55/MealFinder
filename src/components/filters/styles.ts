import {createThemedStyles} from '@helpers';

export const filterStyles = createThemedStyles((colors, scalingMetrics) => {
  const {scaleSize, moderateScale} = scalingMetrics;
  return {
    container: {
      marginTop: scaleSize(20),
      paddingHorizontal: scaleSize(20),
    },
    title: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      marginBottom: scaleSize(10),
      color: colors.black,
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
  };
});

import {StyleSheet} from 'react-native';
import {createThemedStyles} from '@helpers';

export const mealDetailStyles = createThemedStyles((colors, scalingMetrics) => {
  const {wp, scaleSize, moderateScale} = scalingMetrics;

  return StyleSheet.create({
    image: {
      width: wp(100),
      height: wp(55),
    },
    icon: {
      padding: scaleSize(8),
      position: 'absolute',
      backgroundColor: colors.white,
      top: scaleSize(10),
      borderRadius: scaleSize(25),
      borderWidth: scaleSize(2),
      borderColor: colors.gray800,
      shadowOpacity: 1,
      shadowRadius: scaleSize(12),
      shadowColor: colors.black,
      zIndex: 1,
    },
    backIcon: {
      left: scaleSize(10),
      shadowOffset: {width: scaleSize(4), height: scaleSize(8)},
    },
    favouriteIcon: {
      right: scaleSize(10),
      shadowOffset: {width: -scaleSize(4), height: scaleSize(8)},
    },
    recipeTitle: {
      margin: scaleSize(16),
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      color: colors.black,
      textAlign: 'center',
    },
    recipeSummary: {
      color: colors.gray800,
      marginBottom: scaleSize(8),
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomWidth: scaleSize(1),
      borderBottomColor: colors.gray300,
    },
    tab: {
      paddingVertical: scaleSize(12),
      paddingHorizontal: scaleSize(16),
      borderBottomWidth: scaleSize(2),
      borderBottomColor: 'transparent',
    },
    tabText: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: colors.gray600,
    },
    tabContent: {
      padding: scaleSize(16),
    },
    sectionTitle: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
      color: colors.black,
      marginBottom: scaleSize(8),
    },
    recipeDetail: {
      fontSize: moderateScale(14),
      color: colors.gray800,
      marginBottom: scaleSize(4),
    },
    detailContainer: {
      flexDirection: 'row',
    },
    detailLabel: {
      fontWeight: '600',
    },
    ingredient: {
      fontSize: moderateScale(14),
      color: colors.gray800,
      marginBottom: scaleSize(4),
    },
    instruction: {
      fontSize: moderateScale(14),
      color: colors.gray800,
      marginBottom: scaleSize(8),
    },
    readMoreButton: {
      alignSelf: 'flex-start',
      marginBottom: scaleSize(16),
    },
    readMoreText: {
      color: colors.orange600,
      fontWeight: '600',
    },
    addButton: {
      backgroundColor: colors.orange600,
      color: colors.white,
      fontSize: moderateScale(16),
      textAlign: 'center',
      paddingVertical: scaleSize(10),
      fontWeight: '600',
    },
    ingredientContainer: {
      flexDirection: 'row',
      gap: scaleSize(4),
      marginVertical: scaleSize(2),
      paddingHorizontal: scaleSize(10),
    },
  });
});

import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';
import {layout} from '@theme';

export const fallbackStyles = createThemedStyles((colors, scalingMetrics) => {
  const {hp, wp, scaleSize, moderateScale} = scalingMetrics;
  return StyleSheet.create({
    container: {
      ...layout.flex_1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
      padding: scaleSize(20),
    },
    iconContainer: {
      marginBottom: hp(5),
    },
    title: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: colors.black,
      marginBottom: scaleSize(10),
      textAlign: 'center',
    },
    message: {
      fontSize: moderateScale(16),
      color: colors.black,
      marginBottom: scaleSize(20),
      textAlign: 'center',
    },
    explanation: {
      fontSize: moderateScale(16),
      color: colors.gray400,
      marginBottom: scaleSize(30),
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors.orange600,
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(10),
      borderRadius: scaleSize(25),
    },
    buttonText: {
      color: colors.white,
      fontSize: moderateScale(16),
      fontWeight: 'bold',
    },
    backgroundElement1: {
      position: 'absolute',
      top: -hp(10),
      right: -wp(10),
      width: wp(40),
      height: wp(40),
      borderRadius: wp(20),
      backgroundColor: colors.orange400,
    },
    backgroundElement2: {
      position: 'absolute',
      bottom: -hp(5),
      left: -wp(5),
      width: wp(3),
      height: wp(3),
      borderRadius: wp(15),
      backgroundColor: colors.orange500,
    },
  });
});

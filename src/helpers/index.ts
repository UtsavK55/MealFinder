import {useMemo} from 'react';
import {Platform} from 'react-native';

import useScalingMetrics from '@hooks/useScalingMetrics';
import {useThemeColors} from '@theme/index';

export const isAndroid = Platform.OS === 'android';

export const createThemedStyles = <T extends NamedStyles<T> | NamedStyles<any>>(
  styleFunction: ThemedStyleFunction<T>,
) => {
  return () => {
    const themeColors = useThemeColors();
    const scalingMetrics = useScalingMetrics();

    return useMemo(
      () => styleFunction(themeColors, scalingMetrics),
      [themeColors, scalingMetrics],
    );
  };
};

export const truncateText = (text: string, maxLength: number): string => {
  return text?.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

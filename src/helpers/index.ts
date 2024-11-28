import {useMemo} from 'react';
import {Platform} from 'react-native';

import useScalingMetrics from '@hooks/useScalingMetrics';
import {useThemeColors} from '@theme/index';
import {API_KEY} from '@network/apiContants';

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

export const appendAuthParams = (url: string): string => {
  return `${url}&apiKey=${API_KEY}`;
};

export const toFistLetterUpperCase = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const formatDate = (date: Date) => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  return ''; // Return an empty string if the date is invalid
};

export const removeHtmlTags = (htmlText: string) => {
  return htmlText.replace(/<[^>]*>/g, '');
};

export const getValueOrNA = (value: string | number | null) => {
  return value != null ? value : 'N/A';
};

import {Dispatch, SetStateAction} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

declare global {
  interface ThemeContextType {
    isDark: boolean;
    setIsDark: Dispatch<SetStateAction<boolean>>;
  }

  interface Colors {
    red500: string;
    gray800: string;
    gray600: string;
    gray500: string;
    gray400: string;
    gray300: string;
    gray200: string;
    gray100: string;
    gray50: string;
    white: string;
    fixedWhite: string;
    black: string;
    fixedBlack: string;
    orange700: string;
    orange600: string;
    orange500: string;
    orange400: string;
    transparent: string;
  }

  type ScalingMetrics = {
    horizontalScale: (size: number) => number;
    verticalScale: (size: number) => number;
    moderateScale: (size: number, factor?: number) => number;
    wp: (widthPercent: number | string) => number;
    hp: (heightPercent: number | string) => number;
    scaleSize: (size: number, factor?: number) => number;
    isLandscape: () => boolean;
  };

  type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

  type ThemedStyleFunction<T> = (
    themeColors: Colors,
    scalingMetrics: ScalingMetrics,
  ) => T;
}

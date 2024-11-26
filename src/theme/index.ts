import {StyleSheet} from 'react-native';

import {useThemeContext} from '@contexts/ThemeProvider';

export const useThemeColors = () => {
  const {isDark} = useThemeContext();

  const colorsLight: Colors = {
    red500: '#C13333',
    gray800: '#6a6a6a',
    gray600: '#969696',
    gray500: '#aaaaaa',
    gray400: '#bdbdbd',
    gray300: '#d1d1d1',
    gray200: '#e3e3e3',
    gray100: '#f0f0f0',
    gray50: '#f7f7f7',
    white: '#FFFFFF',
    fixedWhite: '#FFFFFF',
    black: '#000000',
    fixedBlack: '#000000',
    orange700: '#cc6702',
    orange600: '#fa8900',
    orange500: '#ffa30a',
    orange400: '#ffbb32',
    green600: '#158016',
    transparent: 'rgba(0, 0, 0, 0.5)',
  } as const;

  const colorsDark: Colors = {
    red500: '#C13333',
    gray800: '#f7f7f7',
    gray600: '#d1d1d1',
    gray500: '#aaaaaa',
    gray400: '#E0E0E0',
    gray300: '#d1d1d1',
    gray200: '#333333',
    gray100: '#000000',
    gray50: '#000000',
    white: '#303030',
    fixedWhite: '#FFFFFF',
    black: '#FFFFFF',
    fixedBlack: '#000000',
    orange700: '#cc6702',
    orange600: '#ffbb32',
    orange500: '#ffa30a',
    orange400: '#fa8900',
    green600: '#158016',
    transparent: 'rgba(0, 0, 0, 0.5)',
  } as const;

  return isDark ? colorsDark : colorsLight;
};

export const fontSize = {
  xs: 12,
  s: 14,
  m: 16,
  l: 22,
  xl: 28,
  '2xl': 32,
  '3xl': 40,
};

export const gutters = {
  xs: 2,
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  '5xl': 40,
};

export const layout = StyleSheet.create({
  col: {
    flexDirection: 'column',
  },
  colReverse: {
    flexDirection: 'column-reverse',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsStart: {
    alignItems: 'flex-start',
  },
  itemsStretch: {
    alignItems: 'stretch',
  },
  itemsEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  /* Sizes Layouts */
  flex_1: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  /* Positions */
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  top0: {
    top: 0,
  },
  bottom0: {
    bottom: 0,
  },
  left0: {
    left: 0,
  },
  right0: {
    right: 0,
  },
  z1: {
    zIndex: 1,
  },
  z10: {
    zIndex: 10,
  },
});

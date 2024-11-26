import {StyleSheet} from 'react-native';

import {createThemedStyles} from '@helpers';
import {layout} from '@theme';

export const nodataFoundStyles = createThemedStyles(
  (colors, scalingMetrics) => {
    const {scaleSize} = scalingMetrics;
    return StyleSheet.create({
      container: {...layout.flex_1, margin: scaleSize(10)},
    });
  },
);

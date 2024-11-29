import {ActivityIndicator, View} from 'react-native';

import {useThemeColors} from '@theme';

import {styles} from './styles';

const Loader = ({
  size,
  color,
  bgColor,
  style,
}: {
  size?: number | 'small' | 'large';
  color?: string;
  bgColor?: string;
  style?: Record<string, any>;
}) => {
  const colors = useThemeColors();
  return (
    <View
      style={[
        styles().container,
        {backgroundColor: bgColor ?? colors.white},
        style,
      ]}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || colors.orange600}
      />
    </View>
  );
};

export default Loader;

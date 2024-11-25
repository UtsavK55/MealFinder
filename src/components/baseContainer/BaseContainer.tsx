import {View} from 'react-native';

import {layout, useThemeColors} from '@theme';

const BaseContainer = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) => {
  const colors = useThemeColors();
  return (
    <View style={[layout.flex_1, {backgroundColor: bgColor ?? colors.white}]}>
      {children}
    </View>
  );
};

export default BaseContainer;

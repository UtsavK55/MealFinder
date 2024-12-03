import {Text} from 'react-native';

import {useThemeColors} from '@theme';

const NoDataFound = ({item, style}: NoDataFoundProps) => {
  const colors = useThemeColors();

  return (
    <Text style={[{color: colors.black}, style]}>
      No {item || 'data'} found
    </Text>
  );
};

export default NoDataFound;

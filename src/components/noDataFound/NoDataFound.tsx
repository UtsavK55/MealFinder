import {Text, View} from 'react-native';

import {useThemeColors} from '@theme';

import {nodataFoundStyles} from './styles';

const NoDataFound = ({item, style}: NoDataFoundProps) => {
  const colors = useThemeColors();
  const styles = nodataFoundStyles();
  return (
    <View style={styles.container}>
      <Text style={[{color: colors.black}, style]}>
        No {item || 'data'} found
      </Text>
    </View>
  );
};

export default NoDataFound;

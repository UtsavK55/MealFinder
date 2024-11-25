import {View, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useThemeColors} from '@theme';

const CustomStatusBar = () => {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    statusBar: {
      height: insets.top,
      width: '100%',
      backgroundColor: colors.white,
    },
  });

  return (
    <View style={styles.statusBar}>
      <StatusBar animated backgroundColor={styles.statusBar.backgroundColor} />
    </View>
  );
};

export default CustomStatusBar;

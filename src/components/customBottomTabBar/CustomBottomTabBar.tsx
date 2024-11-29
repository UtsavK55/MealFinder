import {View, TouchableOpacity, Text} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {bottomTabLabels, ROUTES} from '@constants';
import {useThemeColors} from '@theme';

import {customBottomTabStyles} from './styles';

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const styles = customBottomTabStyles();
  const colors = useThemeColors();
  return (
    <View
      style={[
        styles.container,
        descriptors[state.routes[state.index].key]?.options.tabBarStyle,
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = bottomTabLabels[route.name] || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName = '';
        if (route.name === ROUTES.BOTTOM_TAB.HOME) {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === ROUTES.BOTTOM_TAB.MEAL_PLANNER) {
          iconName = isFocused ? 'calendar' : 'calendar-outline';
        } else if (route.name === ROUTES.BOTTOM_TAB.FAVOURITES) {
          iconName = isFocused ? 'heart' : 'heart-outline';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabButton}>
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? colors.orange600 : colors.gray800}
            />
            <Text
              style={[
                styles.tabText,
                {color: isFocused ? colors.orange600 : colors.gray800},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

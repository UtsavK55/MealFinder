import {ExpandableCalendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {formatDate} from '@helpers';
import useScalingMetrics from '@hooks/useScalingMetrics';
import {useThemeColors} from '@theme';

const CalendarStrip = ({selectedDate, onDayPress}: CalendarStripProps) => {
  const colors = useThemeColors();
  const {moderateScale, scaleSize} = useScalingMetrics();

  return (
    <ExpandableCalendar
      current={formatDate(selectedDate)}
      onDayPress={onDayPress}
      markedDates={{
        [formatDate(selectedDate)]: {
          selected: true,
          selectedColor: colors.orange600,
        },
      }}
      theme={{
        calendarBackground: colors.white,
        textSectionTitleColor: colors.gray800,
        selectedDayBackgroundColor: colors.orange600,
        selectedDayTextColor: colors.white,
        todayTextColor: colors.orange600,
        dayTextColor: colors.gray800,
        textDisabledColor: colors.gray400,
        dotColor: colors.orange600,
        selectedDotColor: colors.white,
        arrowColor: colors.orange600,
        monthTextColor: colors.gray800,
        textDayFontSize: moderateScale(16),
        textMonthFontSize: moderateScale(18),
        textDayHeaderFontSize: moderateScale(14),
      }}
      firstDay={1}
      hideArrows={false}
      hideExtraDays={false}
      disableMonthChange={false}
      renderArrow={direction =>
        direction === 'left' ? (
          <Icon
            name="keyboard-arrow-left"
            color={colors.orange600}
            size={scaleSize(20)}
          />
        ) : (
          <Icon
            name="keyboard-arrow-right"
            color={colors.orange600}
            size={scaleSize(20)}
          />
        )
      }
    />
  );
};

export default CalendarStrip;

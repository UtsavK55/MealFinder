import React, {useState} from 'react';
import {CalendarProvider} from 'react-native-calendars';

import BaseContainer from '@components/baseContainer';
import CalendarStrip from '@components/calendarStrip';
import {formatDate} from '@helpers';

const MealPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDayPress = (day: any) => {
    const newDate = new Date(day?.dateString);
    if (newDate.getTime()) {
      setSelectedDate(newDate);
    }
  };

  return (
    <CalendarProvider
      date={formatDate(selectedDate)}
      onDateChanged={onDayPress}>
      <BaseContainer>
        <CalendarStrip selectedDate={selectedDate} onDayPress={onDayPress} />
      </BaseContainer>
    </CalendarProvider>
  );
};

export default MealPlanner;

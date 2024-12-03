import React, {useEffect, useState} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CalendarProvider} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BaseContainer from '@components/baseContainer';
import CalendarStrip from '@components/calendarStrip';
import HorizontalScroll from '@components/horizontalScroll';
import {mealTypes, ROUTES} from '@constants';
import {useDateContext} from '@contexts/DateProvider';
import {formatDate} from '@helpers';
import useScalingMetrics from '@hooks/useScalingMetrics';
import {useAppDispatch, useAppSelector} from '@hooks';
import {deleteData, fetchData} from '@network/apiMethods';
import {mealPlanUrl} from '@network/apiUrl';
import {fetchUserbyEmail} from '@store/Reducers/user';
import {useThemeColors} from '@theme';

import {mealPlannerStyles} from './styles';

const MealPlanSection = ({
  mealId,
  mealName,
  onPressAdd,
  mealData,
  timestamp,
  isLoading,
}: MealPlanSectionProps) => {
  const styles = mealPlannerStyles();
  const colors = useThemeColors();
  const {scaleSize} = useScalingMetrics();
  return (
    <View key={mealId}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{mealName}</Text>
        <Pressable onPress={() => onPressAdd(mealId)}>
          <Icon
            name="add-circle"
            color={colors.orange600}
            size={scaleSize(24)}
          />
        </Pressable>
      </View>
      <HorizontalScroll
        data={mealData}
        fromScreen={ROUTES.MEAL_PLANNER__STACK_SCREEN.MEAL_PLANNER_SCREEN}
        mealId={mealId}
        selectedDate={timestamp}
        isLoading={isLoading}
      />
    </View>
  );
};

const MealPlanner = () => {
  const username = useAppSelector(state => state.userInfo.username);
  const hash = useAppSelector(state => state.userInfo.hash);
  const {selectedDate, setSelectedDate} = useDateContext();
  const styles = mealPlannerStyles();
  const homeNavigation = useNavigation<HomeScreenNavigationType>();
  const dispatch = useAppDispatch();

  const [mealPlan, setMealPlan] = useState<AllMealPlans>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formattedDate = formatDate(selectedDate);
  const timestamp = Math.floor(selectedDate.getTime() / 1000);

  const getAllData = async () => {
    setIsLoading(true);
    dispatch(fetchUserbyEmail());
    const mealPlanData = await fetchData(
      mealPlanUrl(username, hash, formattedDate),
    );

    const mealPlanDetail =
      mealPlanData?.items?.map(({slot, value}: MealPlanDetail) => ({
        slot,
        value,
      })) || [];
    setMealPlan(mealPlanDetail);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, [selectedDate]);

  const onDayPress = (day: any) => {
    const newDate = new Date(day?.dateString);
    if (newDate.getTime()) {
      setSelectedDate(newDate);
    }
  };

  const onPressAdd = (mealId: number) => {
    homeNavigation.navigate(ROUTES.BOTTOM_TAB.HOME, {
      screen: ROUTES.HOME_STACK_SCREEN.SEARCH_RECIPE_SCREEN,
      params: {
        mealId,
        selectedDate: timestamp,
        fromScreen: ROUTES.MEAL_PLANNER__STACK_SCREEN.MEAL_PLANNER_SCREEN,
      },
    });
  };

  const onPressClear = () => {
    Alert.alert(
      'Clear Meal Plan',
      'Are you sure you want to clear entire meal plan?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await deleteData(mealPlanUrl(username, hash, formattedDate));
            getAllData();
          },
        },
      ],
    );
  };

  return (
    <CalendarProvider
      date={formatDate(selectedDate)}
      onDateChanged={onDayPress}>
      <BaseContainer>
        <CalendarStrip selectedDate={selectedDate} onDayPress={onDayPress} />
        <ScrollView style={styles.container}>
          <Text style={styles.screenTitle}>Meal Plan</Text>
          <Text style={styles.screenSubTitle}>
            {selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
          <Pressable style={styles.icon} onPress={onPressClear}>
            <Text style={styles.delete}>Clear Plan</Text>
          </Pressable>
          {mealTypes.map(({mealId, mealName}) => {
            const mealData = mealPlan
              .filter(({slot}) => slot === mealId)
              .map(({value}) => value);

            return (
              <MealPlanSection
                key={mealId}
                mealId={mealId}
                mealData={mealData}
                mealName={mealName}
                onPressAdd={onPressAdd}
                timestamp={timestamp}
                isLoading={isLoading}
              />
            );
          })}
        </ScrollView>
      </BaseContainer>
    </CalendarProvider>
  );
};

export default MealPlanner;

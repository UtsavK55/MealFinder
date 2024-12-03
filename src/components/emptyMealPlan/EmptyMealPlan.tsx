import {Text} from 'react-native';
import {emptyMealPlanQuotes} from '@constants';

import {emptyMealPlanStyles} from './styles';

const EmptyMealPlan = ({mealId}: {mealId: number}) => {
  const styles = emptyMealPlanStyles();

  const quote = emptyMealPlanQuotes[mealId - 1];

  return <Text style={styles.text}>{quote}</Text>;
};

export default EmptyMealPlan;

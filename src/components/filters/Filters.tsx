import {ScrollView, Switch, Text, TouchableOpacity, View} from 'react-native';

import {cuisines, diets} from '@constants';
import {useThemeColors} from '@theme';

import {filterStyles} from './styles';

const FilterSection = ({
  title,
  options,
  selectedOption,
  onSelectOption,
}: FilterSectionProps) => {
  const styles = filterStyles();

  const toFistLetterUpperCase = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterItem,
              selectedOption === option && styles.selectedItem,
            ]}
            onPress={() => onSelectOption(option)}>
            <Text
              style={[
                styles.filterText,
                selectedOption === option && styles.selectedText,
              ]}>
              {toFistLetterUpperCase(option)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const Filters: React.FC<FiltersProps> = ({
  selectedCuisine,
  selectedDiet,
  isVegetarian,
  onSelectCuisine,
  onSelectDiet,
  onToggleVegetarian,
}) => {
  const styles = filterStyles();
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <View style={styles.vegetarianContainer}>
        <Text style={styles.vegetarianText}>Pure Vegetarian</Text>
        <Switch
          value={isVegetarian}
          onValueChange={onToggleVegetarian}
          trackColor={{false: colors.gray300, true: colors.orange600}}
          thumbColor={isVegetarian ? colors.white : colors.gray50}
        />
      </View>
      <FilterSection
        title="Cuisines"
        options={cuisines}
        selectedOption={selectedCuisine}
        onSelectOption={onSelectCuisine}
      />
      <FilterSection
        title="Diets"
        options={diets}
        selectedOption={selectedDiet}
        onSelectOption={onSelectDiet}
      />
    </View>
  );
};

export default Filters;

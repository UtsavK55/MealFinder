import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {cuisines, diets} from '@constants';

import {filterStyles} from './styles';

const FilterSection = ({
  title,
  options,
  selectedOption,
  onSelectOption,
}: FilterSectionProps) => {
  const styles = filterStyles();

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
              {option}
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
  onSelectCuisine,
  onSelectDiet,
}) => {
  const styles = filterStyles();

  return (
    <View style={styles.container}>
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

import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import BaseContainer from '@components/baseContainer';
import {emptyRecipeDetail, mealTypes, recipeDetailTabs} from '@constants';
import {IMAGES} from '@constants/imageConstants';
import {getValueOrNA, removeHtmlTags, truncateText} from '@helpers';
import {fetchData} from '@network/apiMethods';
import {getRecipeByIdUrl} from '@network/apiUrl';
import {useThemeColors} from '@theme';

import {mealDetailStyles} from './styles';

const TabBar = ({tabs, activeTab, onTabPress, recipeInfo}: TabBarProps) => {
  const styles = mealDetailStyles();
  const colors = useThemeColors();
  const {extendedIngredients, instructions} = recipeInfo;

  const filteredTabs = tabs.filter(tab => {
    if (tab === 'Ingredients' && extendedIngredients.length === 0) {
      return false;
    }
    if (tab === 'Instructions' && !instructions) {
      return false;
    }
    return true;
  });

  return (
    <View style={styles.tabBar}>
      {filteredTabs.map((tab, index) => (
        <Pressable
          key={index}
          style={[
            styles.tab,
            activeTab === index && {borderBottomColor: colors.orange600},
          ]}
          onPress={() => onTabPress(index)}>
          <Text
            style={[
              styles.tabText,
              activeTab === index && {
                color: colors.orange600,
                fontWeight: 'bold',
              },
            ]}>
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const TabContent = ({activeTab, recipeInfo}: TabContentProps) => {
  const styles = mealDetailStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  const cleanSummary = removeHtmlTags(recipeInfo?.summary);

  const renderSummarySection = () => (
    <View>
      <Text style={styles.sectionTitle}>Summary</Text>
      <Text style={styles.recipeSummary}>
        {isExpanded ? cleanSummary : truncateText(cleanSummary, 150)}
      </Text>
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>
          {isExpanded ? 'Read less' : 'Read more'}
        </Text>
      </Pressable>
    </View>
  );

  const recipeDetails = [
    {label: 'Servings', value: recipeInfo.servings},
    {
      label: 'Ready in',
      value: recipeInfo.readyInMinutes
        ? `${recipeInfo.readyInMinutes} minutes`
        : null,
    },
    {
      label: 'Cooking time',
      value: recipeInfo.cookingMinutes
        ? `${recipeInfo.cookingMinutes} minutes`
        : null,
    },
    {
      label: 'Preparation time',
      value: recipeInfo.preparationMinutes
        ? `${recipeInfo.preparationMinutes} minutes`
        : null,
    },
    {label: recipeInfo.vegan ? 'Vegan' : 'Non-Vegan', value: ''},
    {
      label: recipeInfo.vegetarian ? 'Vegetarian' : 'Non-Vegetarian',
      value: '',
    },
    {
      label: recipeInfo.dairyFree ? 'Non-Dairy' : 'Contains Dairy products',
      value: '',
    },
    {
      label: recipeInfo.glutenFree ? 'Gluten free' : 'Contains Gluten',
      value: '',
    },
  ];

  const renderDetailsSection = () => (
    <>
      <Text style={styles.sectionTitle}>Details</Text>
      {recipeDetails.map((detail, index) => (
        <View style={styles.detailContainer} key={index}>
          <Text style={[styles.recipeDetail, styles.detailLabel]}>
            {detail.label}
          </Text>
          <Text style={styles.recipeDetail}>
            {getValueOrNA(detail.value) && ':'} {getValueOrNA(detail.value)}
          </Text>
        </View>
      ))}
    </>
  );

  const renderIngredientsSection = () => (
    <>
      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipeInfo.extendedIngredients.map(({id, original}) => (
        <View style={styles.ingredientContainer} key={id}>
          <Text style={styles.ingredient}>•</Text>
          <Text style={styles.ingredient}>{original}</Text>
        </View>
      ))}
    </>
  );

  const renderInstructionsSection = () => (
    <>
      <Text style={styles.sectionTitle}>Instructions</Text>
      {recipeInfo.instructions.map(({number, step}) => (
        <View style={styles.ingredientContainer} key={number}>
          <Text style={styles.ingredient}>{number}.</Text>
          <Text style={styles.ingredient}>{step}</Text>
        </View>
      ))}
    </>
  );

  switch (activeTab) {
    case 0:
      return (
        <>
          {renderSummarySection()}
          {renderDetailsSection()}
        </>
      );
    case 1:
      return renderIngredientsSection();
    case 2:
      return renderInstructionsSection();
    default:
      return null;
  }
};

const MealDetails = () => {
  const styles = mealDetailStyles();
  const colors = useThemeColors();
  const homeNavigation = useNavigation<HomeScreenNavigationType>();
  const route = useRoute<RouteProp<HomeScreenParamList, 'DETAILS_SCREEN'>>();
  const {mealId, recipeId} = route?.params;

  const [activeTab, setActiveTab] = useState(0);
  const [recipeInfo, setRecipeInfo] = useState<RecipeDetail>(emptyRecipeDetail);

  const getAllData = async () => {
    const recipeData = await fetchData(getRecipeByIdUrl(recipeId));

    const {
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      preparationMinutes,
      cookingMinutes,
      id,
      title,
      readyInMinutes,
      servings,
      image,
      summary,
      analyzedInstructions,
      extendedIngredients,
    } = recipeData;

    const transformedRecipeData: RecipeDetail = {
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      preparationMinutes,
      cookingMinutes,
      id,
      title,
      readyInMinutes,
      servings,
      image,
      summary,
      instructions: analyzedInstructions[0]?.steps?.map(
        ({number, step}: Instruction) => ({number, step}),
      ),
      extendedIngredients: extendedIngredients?.map(
        ({id, original, image}: Ingredient) => ({id, original, image}),
      ),
    };

    setRecipeInfo(transformedRecipeData);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const onPressBack = () => {
    homeNavigation.goBack();
  };

  return (
    <BaseContainer>
      <Pressable onPress={onPressBack} style={[styles.backIcon, styles.icon]}>
        <Icon name={'arrow-back'} color={colors.black} size={28} />
      </Pressable>
      <Pressable style={[styles.favouriteIcon, styles.icon]}>
        <Icon name="heart" size={28} color={colors.red500} />
      </Pressable>
      <FastImage
        source={{
          uri: recipeInfo?.image,
          priority: FastImage.priority.high,
        }}
        resizeMode="cover"
        defaultSource={IMAGES.logoImg1}
        style={styles.image}
      />
      <Text style={styles.recipeTitle}>{recipeInfo?.title}</Text>
      <TabBar
        tabs={recipeDetailTabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
        recipeInfo={recipeInfo}
      />
      <ScrollView>
        <View style={styles.tabContent}>
          <TabContent activeTab={activeTab} recipeInfo={recipeInfo} />
        </View>
      </ScrollView>
      {mealId && (
        <Pressable>
          <Text style={styles.addButton}>
            Add to {mealTypes.find(item => item?.mealId == mealId)?.mealName}
          </Text>
        </Pressable>
      )}
    </BaseContainer>
  );
};

export default MealDetails;

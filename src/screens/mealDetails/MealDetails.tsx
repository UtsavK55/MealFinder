import React, {useEffect, useState, useMemo} from 'react';
import {Alert, Pressable, ScrollView, Text, View} from 'react-native';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import BaseContainer from '@components/baseContainer';
import Loader from '@components/loader';
import {
  emptyRecipeDetail,
  mealTypes,
  recipeDetailTabs,
  ROUTES,
  STORAGE_KEYS,
} from '@constants';
import {IMAGES} from '@constants/imageConstants';
import {formatDate, getValueOrNA, removeHtmlTags, truncateText} from '@helpers';
import {useAppSelector} from '@store';
import {addData, deleteData, fetchData} from '@network/apiMethods';
import {
  addMealToPlanUrl,
  deleteMealFromPlanUrl,
  getRecipeByIdUrl,
  mealPlanUrl,
} from '@network/apiUrl';
import {getData, storeData} from '@storage';
import {useThemeColors} from '@theme';

import {mealDetailStyles} from './styles';

const TabBar = ({tabs, activeTab, onTabPress, recipeInfo}: TabBarProps) => {
  const styles = mealDetailStyles();
  const colors = useThemeColors();
  const {extendedIngredients, instructions} = recipeInfo;

  const filteredTabs = useMemo(() => {
    return tabs.filter(tab => {
      if (tab === 'Ingredients' && extendedIngredients.length === 0) {
        return false;
      }
      if (tab === 'Instructions' && !instructions) {
        return false;
      }
      return true;
    });
  }, [tabs, extendedIngredients, instructions]);

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

const recipeDetail = (recipeInfo: RecipeDetail) => [
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

const TabContent = ({activeTab, recipeInfo}: TabContentProps) => {
  const styles = mealDetailStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  const cleanSummary = useMemo(
    () => removeHtmlTags(recipeInfo?.summary),
    [recipeInfo?.summary],
  );

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

  const recipeDetails = useMemo(() => recipeDetail(recipeInfo), [recipeInfo]);

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
  const userData = useAppSelector(({userInfo}) => userInfo.userData);
  const styles = mealDetailStyles();
  const colors = useThemeColors();
  const homeNavigation = useNavigation<HomeScreenNavigationType>();
  const bottomtabNavigation = useNavigation<BottomTabNavigationType>();
  const route = useRoute<RouteProp<HomeScreenParamList, 'DETAILS_SCREEN'>>();

  const {mealId, selectedDate, recipeId, fromScreen} = route?.params;
  const {username, hash} = userData as UserDetail;
  const formattedDate =
    selectedDate && formatDate(new Date(selectedDate * 1000));

  const [activeTab, setActiveTab] = useState(0);
  const [recipeInfo, setRecipeInfo] = useState<RecipeDetail>(emptyRecipeDetail);
  const [mealPlan, setMealPlan] = useState<AllMealPlans>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

    if (selectedDate) {
      const mealPlanData = await fetchData(
        mealPlanUrl(username, hash, formattedDate as string),
      );

      const mealPlanDetail =
        mealPlanData?.items?.map(({slot, value}: MealPlanDetail) => ({
          slot,
          value,
        })) || [];
      setMealPlan(mealPlanDetail);
    }
  };

  const getFavorite = async () => {
    const data = await getData(STORAGE_KEYS.FAVOURITE);
    setFavorites(data || []);

    const favorite = data.includes(recipeId);
    setIsFavorite(favorite);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllData();
    getFavorite();
    setIsLoading(false);
  }, []);

  const mealName = useMemo(() => {
    return mealTypes.find(item => item?.mealId === mealId)?.mealName;
  }, [mealTypes, mealId]);

  const {id, title, image} = recipeInfo;
  const queryParams = useMemo(
    () => ({
      date: selectedDate,
      slot: mealId,
      position: 0,
      type: 'RECIPE',
      value: {
        id,
        title,
        image,
      },
    }),
    [id, title, image, mealId, selectedDate],
  );

  const mealMatch = useMemo(() => {
    return mealPlan.some(
      meal => meal.slot === mealId && meal.value.id === recipeId,
    );
  }, [mealPlan, mealId, recipeId]);

  const onPressBack = () => {
    if (fromScreen === ROUTES.MEAL_PLANNER__STACK_SCREEN.MEAL_PLANNER_SCREEN) {
      bottomtabNavigation.dispatch(
        CommonActions.reset({
          routes: [{name: ROUTES.BOTTOM_TAB.MEAL_PLANNER}],
        }),
      );
    } else if (fromScreen === ROUTES.BOTTOM_TAB.FAVOURITES) {
      bottomtabNavigation.dispatch(
        CommonActions.reset({
          routes: [{name: ROUTES.BOTTOM_TAB.FAVOURITES}],
        }),
      );
    } else {
      homeNavigation.goBack();
    }
  };

  const onPressAdd = async () => {
    Alert.alert(
      `Add to ${mealName}`,
      'Are you sure you want to add this recipe to your meal plan?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Add',
          style: 'default',
          onPress: async () => {
            await addData(addMealToPlanUrl(username, hash), queryParams);
            onPressBack();
          },
        },
      ],
    );
  };

  const onPressFavoriteIcon = async (id: number) => {
    let updatedFavorites: number[];

    if (isFavorite) {
      updatedFavorites = favorites.filter(item => item !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    await storeData(updatedFavorites, STORAGE_KEYS.FAVOURITE);
    setIsFavorite(!isFavorite);
  };

  const onPressRemove = () => {
    Alert.alert(
      `Remove from ${mealName}`,
      'Are you sure you want to remove this recipe from your meal plan?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await deleteData(deleteMealFromPlanUrl(username, hash, id));
            onPressBack();
          },
        },
      ],
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BaseContainer>
      <Pressable onPress={onPressBack} style={[styles.backIcon, styles.icon]}>
        <Icon name={'arrow-back'} color={colors.black} size={28} />
      </Pressable>
      <Pressable
        style={[styles.favouriteIcon, styles.icon]}
        onPress={() => onPressFavoriteIcon(recipeInfo?.id)}>
        {isFavorite ? (
          <Icon name="heart" size={24} color={colors.red500} />
        ) : (
          <Icon name="heart-outline" size={24} color={colors.black} />
        )}
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
      {mealId ? (
        !mealMatch ? (
          <Pressable onPress={onPressAdd}>
            <Text style={styles.addButton}>Add to {mealName}</Text>
          </Pressable>
        ) : (
          <Pressable onPress={onPressRemove}>
            <Text style={styles.removeButton}>Remove from {mealName}</Text>
          </Pressable>
        )
      ) : (
        <></>
      )}
    </BaseContainer>
  );
};

export default MealDetails;

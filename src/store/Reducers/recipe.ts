import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {randomRecipeTypes, storeConstants} from '@constants';
import {_get} from '@network/axiosInstance';

const {name, thunk} = storeConstants.recipe;

const initialState = {
  appetizers: [],
  mainCourse: [],
  desserts: [],
};

export const fetchRandomRecipes = createAsyncThunk(
  thunk.fetchRandomRecipes,
  async ({url, type}: {url: string; type: string}) => {
    try {
      const response = await _get(url);

      return {
        type,
        status: response?.status,
        recipes: response?.data?.recipes?.map(
          ({id, title, image, vegetarian}: RecipeCard) => ({
            id,
            title,
            image,
            vegetarian,
          }),
        ),
      };
    } catch (error) {
      return error.response.data;
    }
  },
);

export const recipeSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRandomRecipes.fulfilled, (state, action) => {
      const {type, recipes, status} = action.payload;
      if (status === 200) {
        if (type === randomRecipeTypes[0]) {
          state.appetizers = recipes;
        } else if (type === randomRecipeTypes[1]) {
          state.mainCourse = recipes;
        } else {
          state.desserts = recipes;
        }
      }
    });
    builder.addCase(fetchRandomRecipes.rejected, (state, action) => {
      state = initialState;
    });
  },
});

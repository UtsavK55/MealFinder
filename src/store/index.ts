import {configureStore} from '@reduxjs/toolkit';

import {userSlice} from './reducers/user';
import {recipeSlice} from './reducers/recipe';
import {mealPlanSlice} from './reducers/mealPlan';
import {loadingStatusSlice} from './reducers/loadingStatus';

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    recipes: recipeSlice.reducer,
    mealPlan: mealPlanSlice.reducer,
    loadingStatus: loadingStatusSlice.reducer,
  },
});

import {createSlice} from '@reduxjs/toolkit';

import ShowToast from '@components/showToast';
import {storeConstants} from '@constants';
import {ErrorHandler} from '@network/errorHandler';

import {fetchRandomRecipes} from './recipe';
import {fetchUserbyEmail} from './user';

export const loadingStatusSlice = createSlice({
  name: storeConstants.loadingStatus.name,
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    // For handling pending actions
    function pendingReducer(thunk: any) {
      return builder.addCase(thunk.pending, state => {
        state.loading = true;
      });
    }
    // For handling reject actions
    function rejectReducer(thunk: any, message: string) {
      return builder.addCase(thunk.rejected, (state, action) => {
        state.loading = false;
        ShowToast('error', `Error occurred while ${message}`);
      });
    }
    // For handling listing actions
    function listReducer(thunk: any) {
      return builder.addCase(thunk.fulfilled, (state, action) => {
        const {status} = action.payload;
        state.loading = false;
        if (status === 'failure') {
          ErrorHandler(action.payload);
        }
      });
    }
    // For handling submitting actions
    function submitReducer(thunk: any, message: string) {
      return builder.addCase(thunk.fulfilled, (state, action) => {
        const {status} = action.payload;
        state.loading = false;
        if (status === 'failure') {
          ErrorHandler(action.payload);
        } else if (status === 200) {
          ShowToast('success', `${message} successfully`);
        }
      });
    }

    pendingReducer(fetchUserbyEmail);
    listReducer(fetchUserbyEmail);
    rejectReducer(fetchUserbyEmail, 'fetching recipes');
    pendingReducer(fetchRandomRecipes);
    listReducer(fetchRandomRecipes);
    rejectReducer(fetchRandomRecipes, 'fetching user data');
  },
});

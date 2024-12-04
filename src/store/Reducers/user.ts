import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {STORAGE_KEYS, storeConstants} from '@constants';
import {addData} from '@network/apiMethods';
import {getUserDataUrl} from '@network/apiUrl';
import {getData, storeData} from '@storage';

const {name, thunk} = storeConstants.user;

export const fetchUserbyEmail = createAsyncThunk(
  thunk.fetchUserbyEmail,
  async () => {
    const userDetail = await getData(STORAGE_KEYS.USER_DATA);

    if (userDetail) {
      return userDetail;
    } else {
      const response = await addData(getUserDataUrl);
      return response?.data;
    }
  },
);

export const userSlice = createSlice({
  name,
  initialState: {
    userData: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserbyEmail.fulfilled, (state, action) => {
      state.userData = action.payload;
      storeData(state.userData, STORAGE_KEYS.USER_DATA);
    });
    builder.addCase(fetchUserbyEmail.rejected, (state, action) => {
      state.userData = {};
    });
  },
});

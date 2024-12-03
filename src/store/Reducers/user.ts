import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {STORAGE_KEYS} from '@constants';
import {addData} from '@network/apiMethods';
import {getUserDataUrl} from '@network/apiUrl';
import {getData, storeData} from '@storage';

export const fetchUserbyEmail = createAsyncThunk('fetchUserByEmail', async () => {
  const userDetail = await getData(STORAGE_KEYS.USER_DATA);

  if (userDetail) {
    return userDetail;
  } else {
    const response = await addData(getUserDataUrl);
    return response?.data;
  }
});

const initialState = {hash: '', username: ''};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserbyEmail.fulfilled, (state, action) => {
      state.hash = action.payload?.hash;
      state.username = action.payload?.username;
      storeData(state, STORAGE_KEYS.USER_DATA);
    });
    builder.addCase(fetchUserbyEmail.rejected, (state, action) => {
      state = initialState;
    });
  },
});

import {configureStore} from '@reduxjs/toolkit';

import {userSlice} from './Reducers/user';

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import { counterApi } from '@/store/features/counter/counterApi';
import counterReducer from '@/store/features/counter/counterSlice';
import authReducer from '@/store/features/auth/authSlice';
import { authApi } from './features/auth/authApi';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
      auth: authReducer,
      [counterApi.reducerPath]: counterApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(counterApi.middleware)
        .concat(authApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

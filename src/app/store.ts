import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bicyclesReducer from '../features/bicycle/entity/BicyclesStoreSlice';

export const store = configureStore({
  reducer: {
    bicycles: bicyclesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
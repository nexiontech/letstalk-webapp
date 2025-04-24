import { configureStore } from '@reduxjs/toolkit';
// Import reducers from feature slices
import counterReducer from './features/counter/counterSlice';
import authReducer from '../services/amplifyAuthService';

export const store = configureStore({
  reducer: {
    // Add reducers here as they are created
    counter: counterReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'auth/login/fulfilled',
          'auth/checkStatus/fulfilled',
          'auth/register/fulfilled',
          'auth/confirmRegistration/fulfilled',
          'auth/forgotPassword/fulfilled',
          'auth/confirmForgotPassword/fulfilled'
        ],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
import { configureStore } from '@reduxjs/toolkit';
// Import reducers from feature slices
import counterReducer from './features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here as they are created
    counter: counterReducer,
  },
});


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
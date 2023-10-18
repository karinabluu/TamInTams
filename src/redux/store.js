import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Combine the reducers
const rootReducer = combineReducers({
  // Add other reducers here if needed
});

export const store = configureStore({
  reducer: rootReducer,
});

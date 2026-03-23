import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {toDoSReducer} from "../features/todos/todoSlice";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// 1. Configuration object
const persistConfig = {
  key: "root",       // The key used in localStorage
  version: 1,
 storage: {
    getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key: string, value: string) => Promise.resolve(window.localStorage.setItem(key, value)),
    removeItem: (key: string) => Promise.resolve(window.localStorage.removeItem(key)),
  },          // Use localStorage
  whitelist: ["todos"] // Optional: only persist specific slices
};

// 2. Combine your reducers
const rootReducer = combineReducers({
  todos: toDoSReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
// 3. Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore internal redux-persist actions that aren't plain objects
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Create the persistor
export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;
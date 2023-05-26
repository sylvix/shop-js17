import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from '@/features/products/productsSlice';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, persistStore } from 'redux-persist';
import { usersSlice } from '@/features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const usersPersistConfig = {
  key: 'shop:users',
  storage,
  whitelist: ['user'],
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  let rootReducer = combineReducers({
    [productsSlice.name]: productsSlice.reducer,
    [usersSlice.name]: isServer ? usersSlice.reducer : persistReducer(usersPersistConfig, usersSlice.reducer),
  });

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  if (!isServer) {
    // @ts-expect-error
    store.__persistor = persistStore(store);
  }

  return store;
};

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];

export const wrapper = createWrapper<RootStore>(makeStore);

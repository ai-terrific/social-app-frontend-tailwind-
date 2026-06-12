// ** Redux Imports
import { TypedUseSelectorHook, useSelector as useAppSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { STORE_KEY } from '@/configs'

// ** Reducer Imports
import reducers from './reducers'

type RootState = ReturnType<typeof reducers>

const persistConfig = {
  key: STORE_KEY,
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persister = persistStore(store)
export const dispatch = store.dispatch
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export * from './reducers/auth'

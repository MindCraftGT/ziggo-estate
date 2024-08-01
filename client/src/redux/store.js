import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice";
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

//add redux-persist to browser losing data and signing off the user whenever the page is reloaded
const rootReducer = combineReducers({user: useReducer});

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

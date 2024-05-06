import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authSlice";
import { loadingBarReducer } from "react-redux-loading-bar";
import leaderboardReducer from "./reducers/leaderboardSlice";
import usersReducer from "./reducers/userSlice";
import threadReducer from "./reducers/threadSlice";
import commentReducer from "./reducers/commnetSlice";
import { checkAuthMiddleware } from "./middleware";

const rootConfigReducer = {
    key: 'root',
    storage,
    blackList: ['auth', 'loadingBar'],
}

const authConfigReducer = {
    key: 'auth',
    storage,
    whiteList: ['user, token'],
}

const reducers = combineReducers({
    auth: persistReducer(authConfigReducer, authReducer),
    leaderboard: leaderboardReducer,
    users: usersReducer,
    thread: threadReducer,
    comment: commentReducer,
    loadingBar: loadingBarReducer,
});

const persistedReducers = persistReducer(rootConfigReducer, reducers);

const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoreActions: [[REGISTER, FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE]],
            }
        }),
        checkAuthMiddleware,
    ]
})

export const persistor = persistStore(store);

export default store;
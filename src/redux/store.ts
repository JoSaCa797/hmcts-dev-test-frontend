import { combineReducers, configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userTasksReducer from "./slices/UserTaskSlice";

const rootReducer = combineReducers({
    userTasks: userTasksReducer
});

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export default store;
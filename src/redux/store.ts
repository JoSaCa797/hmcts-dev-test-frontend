import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

export default store;
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../thunk";
import { createUserTask, getUserTasks } from "../../util/testApi";

export interface UserTask {
    Id: number;
    Title: string;
    Description: string | null;
    Status: boolean;
    Due: string;
}

export interface NewUserTask {
    Title: string;
    Description: string | null;
    Status: boolean;
    Due: string;
}

interface UserTaskState {
    UserTasks: UserTask[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

export const fetchUserTasks = createAppAsyncThunk('userTasks/FetchUserTasks', 
    async () => {
        const response = await getUserTasks();
        return response;
    },
    {
        condition(arg, thunkApi) {
            const userTaskStatus = thunkApi.getState().userTasks.status;
            if(userTaskStatus !== 'idle'){
                return false;
            }
        }
    }
)

export const postUserTask = createAppAsyncThunk('userTasks/PostUserTask',
    async (userTaskPost: NewUserTask) => {
        const response = await createUserTask(userTaskPost);
        return response;
    },
)

const initialState: UserTaskState = {
    UserTasks: [],
    status: "idle",
    error: null
};

const UserTaskSlice = createSlice({
    name: "UserTask",
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserTasks.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchUserTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.UserTasks.push(...action.payload);
            })
            .addCase(fetchUserTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ?? "Unknown Error";
            })
            .addCase(postUserTask.fulfilled, (state, action) => {
                state.UserTasks.push(action.payload);
            })
    }
});

export const {  } = UserTaskSlice.actions;
export default UserTaskSlice.reducer;


import { createSlice, current, isAnyOf } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../thunk";
import { createTask, deleteTask, getTaskById, getTasks, updateTaskStatus } from "../../util/testApi";

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
        const response = await getTasks();
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

export const fetchUserTask = createAppAsyncThunk('userTasks/FetchUserTask', 
    async (id: number) => {
        const response = await getTaskById(id);
        return response;
    },
    {
        condition(arg, thunkApi) {
            debugger;
            const userTaskStatus = thunkApi.getState().userTasks.status;
            if(userTaskStatus !== 'idle'){
                return false;
            }
        }
    }
)

export const postUserTask = createAppAsyncThunk('userTasks/PostUserTask',
    async (userTaskPost: NewUserTask) => {
        const response = await createTask(userTaskPost);
        return response;
    },
)

export const deleteUserTask = createAppAsyncThunk('userTasks/DeleteUserTask',
    async (id: number) => {
        return await deleteTask(id);
    },
)

export const updateUserTaskStatus = createAppAsyncThunk('userTask/UpdateUserTask', 
    async (userTask: UserTask) => {
        return await updateTaskStatus(userTask);
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
            .addCase(fetchUserTasks.fulfilled, (state, action) => {
                state.status = "idle";
                state.UserTasks = [...action.payload];
            })
            .addCase(fetchUserTask.fulfilled, (state, action) => {
                state.status = "idle";
                state.UserTasks = [action.payload];
            })
            .addCase(postUserTask.fulfilled, (state, action) => {
                state.status = "idle";
                state.UserTasks.push(action.payload);
            })
            .addCase(deleteUserTask.fulfilled, (state, action) => {
                state.status = "idle";
                state.UserTasks = state.UserTasks.filter(task => task.Id !== action.payload);
            })
            .addCase(updateUserTaskStatus.fulfilled, (state, action) => {
                const updatedTaskIndex = state.UserTasks.findIndex(task => task.Id === action.payload.Id);
                if(updatedTaskIndex === -1) return;
                state.status = "idle";
                state.UserTasks[updatedTaskIndex] = action.payload;
            })
            .addMatcher(
                isAnyOf(fetchUserTasks.rejected, fetchUserTask.rejected, postUserTask.rejected, deleteUserTask.rejected, updateUserTaskStatus.rejected),
                (state, action) => {
                    state.status = "failed"
                    state.error = action.error.message ?? "Unknown Error";
                }
            )
            .addMatcher(
                isAnyOf(fetchUserTasks.pending, fetchUserTask.pending),
                (state) => {
                    state.status = "pending"
                }
            )
    }
});

export const {  } = UserTaskSlice.actions;
export default UserTaskSlice.reducer;


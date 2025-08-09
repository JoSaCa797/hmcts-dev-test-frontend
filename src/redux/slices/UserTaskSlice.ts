import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserTask {
    Title: string;
    Description: string | null;
    Status: boolean;
    Due: Date
}

const initialState: UserTask[] = [
    {
        Title: "Test1",
        Description: "Test2",
        Status: false,
        Due: new Date()
    }
];

const UserTaskSlice = createSlice({
    name: "UserTask",
    initialState: initialState,
    reducers: {
        updateUserTasks: (_, action: PayloadAction<UserTask[]>) => {
            return action.payload;
        }
    }
});

export const { updateUserTasks } = UserTaskSlice.actions;
export default UserTaskSlice.reducer;


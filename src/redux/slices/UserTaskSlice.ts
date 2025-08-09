import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserTask {
    Id: number;
    Title: string;
    Description: string | null;
    Status: boolean;
    Due: Date
}

const initialState: UserTask[] = [
    {
        Id: 0,
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


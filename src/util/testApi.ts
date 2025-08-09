import type { NewUserTask, UserTask } from "../redux/slices/UserTaskSlice";

export const getUserTasks = async (): Promise<UserTask[]> => {
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("Delayed for 5 seconds");

    return [
        {
            Id: 0,
            Title: "Test1",
            Description: "Test1",
            Status: false,
            Due: new Date().toString()
        },
        {
            Id: 1,
            Title: "Test2",
            Description: "Test2",
            Status: true,
            Due: new Date().toString()
        }
    ]

}

export const createUserTask = async (newUserTask: NewUserTask): Promise<UserTask> => {

    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("Delayed for 5 seconds");

    return {
        Id: 2,
        ...newUserTask
    }

}
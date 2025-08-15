import UserTaskTable from "./components/UserTaskTable"
import { deleteUserTask, fetchUserTask, fetchUserTasks, postUserTask, updateUserTaskStatus } from "./redux/slices/UserTaskSlice"
import store from "./redux/store"

function App() {

    store.dispatch(fetchUserTasks());

    const handleCreateBtnClick = () => {
        store.dispatch(postUserTask({
            Title: "Test3",
            Description: "Test3",
            Status: false,
            Due: new Date().toString(),
        }));
    }

    const handleDeleteBtnClick = () => {
        store.dispatch(deleteUserTask(1));
    }

    const handleUpdateBtnClick = () => {
        store.dispatch(updateUserTaskStatus({
            Id: 0,
            Title: "Test1",
            Description: "Test1",
            Status: false,
            Due: new Date().toString()
        }));
    }

    const handleGetTaskBtnClick = () => {
        store.dispatch(fetchUserTask(1))
    }

    return (
        <div className="w-screen h-screen bg-slate-500">
            <UserTaskTable />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGetTaskBtnClick}>Test get button</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateBtnClick}>Test create button</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteBtnClick}>Test delete button</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpdateBtnClick}>Test update button</button>
        </div>
    )
}

export default App

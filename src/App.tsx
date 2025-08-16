import CreateTask from "./components/CreateTask";
import UserTaskTable from "./components/UserTaskTable"
import { deleteUserTask, fetchUserTask, fetchUserTasks, postUserTask, updateUserTaskStatus } from "./redux/slices/UserTaskSlice"
import store from "./redux/store"

function App() {

    store.dispatch(fetchUserTasks());

    const handleDeleteBtnClick = () => {
        store.dispatch(deleteUserTask(1));
    }

    const handleGetTaskBtnClick = () => {
        store.dispatch(fetchUserTask(1))
    }

    return (
        <div className="w-screen min-h-screen bg-slate-300 p-10">
            <CreateTask />

            <UserTaskTable />
        </div>
    )
}

export default App

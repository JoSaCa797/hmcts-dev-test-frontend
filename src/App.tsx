import UserTaskTable from "./components/UserTaskTable"
import { fetchUserTasks, postUserTask } from "./redux/slices/UserTaskSlice"
import store from "./redux/store"

function App() {

    store.dispatch(fetchUserTasks());

    const handleBtnClick = () => {
        store.dispatch(postUserTask({
            Title: "Test3",
            Description: "Test3",
            Status: false,
            Due: new Date().toString(),
        }));
    }

    return (
        <div className="w-screen h-screen bg-slate-500">
            <UserTaskTable />
            <button onClick={handleBtnClick}>Test button</button>
        </div>
    )
}

export default App

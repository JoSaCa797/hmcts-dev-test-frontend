import UserTaskTable from "./components/UserTaskTable"
import { fetchUserTasks } from "./redux/slices/UserTaskSlice"
import store from "./redux/store"

function App() {

    store.dispatch(fetchUserTasks());

    return (
        <div className="w-screen h-screen bg-slate-500">
            <UserTaskTable />
        </div>
    )
}

export default App

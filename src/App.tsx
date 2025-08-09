import { useSelector } from "react-redux"
import { type RootState } from "./redux/store"

function App() {
    
    const userTasks = useSelector((state: RootState) => state.userTasks)

    return (
        <div className="w-screen h-screen bg-pink-300">
            {
                userTasks.map((ut, index) => {
                    return (
                        <p key={index}>{ut.Title}, {ut.Description}, {ut.Status}, {ut.Due.toString()}</p>
                    )
                })
            }
        </div>
    )
}

export default App

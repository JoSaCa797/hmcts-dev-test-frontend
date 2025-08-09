import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

const UserTaskTable = () => {
    
    const userTasks = useSelector((state: RootState) => state.userTasks);

    return (
        <div>
            
        </div>
    )
}

export default UserTaskTable
import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

const UserTaskTable = () => {

    const userTasks = useSelector((state: RootState) => state.userTasks);

    return (
        <div className='flex flex-col'>
            {
                userTasks.status !== "pending" ? (
                    userTasks.UserTasks.map((ut, index) => {
                        return (
                            <p key={index}>{ut.Id}, {ut.Title}, {ut.Description}, {ut.Status.toString()}, {ut.Due}</p>
                        )
                    })
                ) : (
                    <p>Fetching...</p>
                )
            }
        </div>
    )
}

export default UserTaskTable
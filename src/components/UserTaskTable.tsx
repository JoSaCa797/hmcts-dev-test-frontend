import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

const UserTaskTable = () => {

    const userTasks = useSelector((state: RootState) => state.userTasks);

    return (
        <div className='relative overflow-x-auto p-2'>
            <table className='w-full text-sm text-left rtl:text-right text-black border-2'>
                <thead>
                    <tr className='border-2'>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Due</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userTasks.status !== "pending" ? (
                            userTasks.UserTasks.map((ut, index) => {
                                return (
                                    <tr key={index} className='border-b-2'>
                                        <td className='px-6 py-4 border-r-2'>{ut.Title}</td>
                                        <td className='px-6 py-4 border-r-2 break-words'>
                                            <div className="max-h-[10rem] overflow-y-auto break-words pr-2">
                                                {ut.Description}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 border-r-2'>{ut.Status.toString()}</td>
                                        <td className='px-6 py-4'>{ut.Due}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td>Fetching...</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTaskTable
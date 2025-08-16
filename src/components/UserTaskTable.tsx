import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../redux/store'
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import { updateUserTaskStatus, type UserTask } from '../redux/slices/UserTaskSlice';
import Spinner from './Spinner';

interface RequestStatusProps {
    status: 'idle' | 'pending';
    id: number | null;
}

const defaultRequestStatus: RequestStatusProps = {
    status: 'idle',
    id: null
}

const UserTaskTable = () => {

    const userTasks = useSelector((state: RootState) => state.userTasks);
    const [requestStatus, setRequestStatus] = useState<RequestStatusProps>(defaultRequestStatus);

    const dispatch = useAppDispatch();

    const handleStatusChange = async (task: UserTask) => {

        try {

            if(requestStatus.status === 'pending') return;

            setRequestStatus({status: "pending", id: task.Id});
            await dispatch(updateUserTaskStatus(task));

            setRequestStatus(defaultRequestStatus);

        } catch (e) {
            console.log('Failed to update task status', e)

            setRequestStatus(defaultRequestStatus);
        }
    }

    const getStatusIcon = (task: UserTask) => {
        if(task.Id === requestStatus.id) return <Spinner />;
        if(task.Status) return <FaRegCheckCircle className='w-10 h-10 hover:cursor-pointer' onClick={() => handleStatusChange(task)} />;
        return <FaRegCircle className='w-10 h-10 hover:cursor-pointer' onClick={() => handleStatusChange(task)} />;
    }

    return (
        <div className='relative overflow-x-auto p-2'>
            <table className='w-full text-sm text-left rtl:text-right text-black border-2'>
                <thead>
                    <tr className='border-2'>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3 w-2/4">Description</th>
                        <th scope="col" className="px-6 py-3">Due</th>
                        <th scope="col" className="px-6 py-3">Status</th>
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
                                        <td className='px-6 py-4 border-r-2'>{ut.Due}</td>
                                        <td className='px-6 py-4'>
                                            {
                                                getStatusIcon(ut)
                                            } 
                                        </td>
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
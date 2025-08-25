import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, type RootState } from '../redux/store'
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import { deleteUserTask, updateUserTaskStatus, type UserTask } from '../redux/slices/UserTaskSlice';
import Spinner from './Spinner';
import { MdDeleteForever } from 'react-icons/md';

interface RequestStatusProps {
    status: 'idle' | 'pending';
    action: 'status' | 'delete' | null;
    id: number | null;
}

const defaultRequestStatus: RequestStatusProps = {
    status: 'idle',
    action: null,
    id: null
}

const UserTaskTable = () => {

    const userTasks = useSelector((state: RootState) => state.userTasks);
    const [requestStatus, setRequestStatus] = useState<RequestStatusProps>(defaultRequestStatus);

    const dispatch = useAppDispatch();

    const handleStatusChange = async (task: UserTask) => {

        try {

            if(requestStatus.status === 'pending') return;

            setRequestStatus({status: "pending", id: task.Id, action: 'status'});
            await dispatch(updateUserTaskStatus(task));

            setRequestStatus(defaultRequestStatus);

        } catch (e) {
            console.log('Failed to update task status', e)
            setRequestStatus(defaultRequestStatus);
        }
    }

    const handleStatusDelete = async (task: UserTask) => {
        
        try {

            if(requestStatus.status === 'pending') return;

            setRequestStatus({status: "pending", id: task.Id, action: 'delete'});

            await dispatch(deleteUserTask(task.Id));

            setRequestStatus(defaultRequestStatus);

        } catch (e) {
            console.log('Failed to delete task', e)
            setRequestStatus(defaultRequestStatus);
        }

    }

    const getStatusIcon = (task: UserTask) => {
        if(task.Id === requestStatus.id && requestStatus.action === 'status') return <Spinner />;
        if(task.Status) return <FaRegCheckCircle className='w-10 h-10 hover:cursor-pointer' onClick={() => handleStatusChange(task)} />;
        return <FaRegCircle className='w-10 h-10 hover:cursor-pointer' onClick={() => handleStatusChange(task)} />;
    }

    const getDeleteIcon = (task: UserTask) => {
        if(task.Id === requestStatus.id && requestStatus.action === 'delete') return <Spinner />;
        return <MdDeleteForever className='w-10 h-10 hover:cursor-pointer' onClick={() => handleStatusDelete(task)} />
    }

    return (
        <div className='relative overflow-x-auto p-2 scrollbar scrollbar-thumb-black scrollbar-track-gray-200'>
            <table className='w-full text-sm text-left rtl:text-right text-black'>
                <thead>
                    <tr className=''>
                        <th scope="col" className="px-6 py-3 border-2">Title</th>
                        <th scope="col" className="px-6 py-3 w-2/4 border-2">Description</th>
                        <th scope="col" className="px-6 py-3 border-2">Due</th>
                        <th scope="col" className="px-6 py-3 border-2">Status</th>
                        <th scope="col" className="px-6 py-3 border-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userTasks.status !== "pending" ? (
                            userTasks.UserTasks.map((ut, index) => {
                                return (
                                    <tr key={index} className='border-b-2 border-l-2'> 
                                        <td className='px-6 py-4 border-r-2'>
                                            <div className="overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-track-gray-200 pr-2 max-h-[10rem]" style={{ scrollbarGutter: 'stable' }}>
                                            {ut.Title}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 border-r-2 break-words'>
                                            <div className="overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-track-gray-200 pr-2 max-h-[10rem]" style={{ scrollbarGutter: 'stable' }}>
                                                {ut.Description}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 border-r-2'>{ut.Due}</td>
                                        <td className='px-6 py-4 border-r-2'>
                                            {
                                                getStatusIcon(ut)
                                            } 
                                        </td>
                                        <td className='px-6 py-4 border-2'>
                                            {
                                                getDeleteIcon(ut)
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr className='border-2'>
                                <td>Fetching tasks...</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTaskTable
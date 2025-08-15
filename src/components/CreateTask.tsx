import React, { useState } from 'react'
import store, { useAppDispatch } from '../redux/store';
import { postUserTask } from '../redux/slices/UserTaskSlice';
import Spinner from './Spinner';

interface UserTaskForm {
    Title: string;
    Description: string;
    Due: string;
}

const defaultFormInputs: UserTaskForm = {
    Title: '',
    Description: '',
    Due: ''
}

const CreateTask = () => {

    const [formInputs, setFormInputs] = useState<UserTaskForm>(defaultFormInputs);
    const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>('idle');

    const dispatch = useAppDispatch();

    const handleFormChange = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        setFormInputs(values => ({...values, [name]: value}))
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            setRequestStatus('pending');
            await dispatch(postUserTask({
                Title: formInputs.Title,
                Description: formInputs.Description,
                Status: false,
                Due: formInputs.Due,
            }));
            setFormInputs(defaultFormInputs);

        } catch(e) {
            console.log('Failed to create task', e)
        } finally {
            setRequestStatus('idle');
        }
    }

    const requestStatusFlag: boolean = requestStatus === 'idle';

    console.log(requestStatusFlag)

    return (
        <React.Fragment>
            <form className='flex flex-row gap-1' onSubmit={handleFormSubmit}>
                
                <div className='flex flex-col'>
                    <label>Title:</label>
                    <input type='text' className='bg-white border-1' name='Title' value={formInputs['Title']} onChange={handleFormChange} required />
                </div>

                <div className="flex flex-col">
                    <label>Description:</label>
                    <input type='text' className='bg-white border-1' name='Description' value={formInputs['Description']} onChange={handleFormChange} />
                </div>

                <div className="flex flex-col">
                    <label>Due:</label>
                    <input type='datetime-local' className='bg-white border-1' name='Due' value={formInputs['Due']} onChange={handleFormChange} required />
                </div>

                <input className={`${requestStatusFlag ? "bg-blue-400 hover:bg-blue-500 hover:cursor-pointer" : "bg-gray-500"} text-white font-semibold px-4 py-2 rounded transition-colors`} type='submit' value='Create task' disabled={!requestStatusFlag} />
            </form>

            {
                !requestStatusFlag && (
                    <Spinner />
                )
            }
        </React.Fragment>
    )
}

export default CreateTask
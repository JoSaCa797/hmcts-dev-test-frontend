import React, { useState } from 'react'
import store from '../redux/store';
import { postUserTask } from '../redux/slices/UserTaskSlice';

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

    const [formInputs, setFormInputs] = useState<UserTaskForm>(defaultFormInputs)

    const handleFormChange = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        setFormInputs(values => ({...values, [name]: value}))
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        store.dispatch(postUserTask({
            Title: formInputs.Title,
            Description: formInputs.Description,
            Status: false,
            Due: formInputs.Due,
        }));

        setFormInputs(defaultFormInputs);
    }

    return (
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

            <input className='bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition-colors hover:cursor-pointer' type='submit' value='Create task' />
        </form>
    )
}

export default CreateTask
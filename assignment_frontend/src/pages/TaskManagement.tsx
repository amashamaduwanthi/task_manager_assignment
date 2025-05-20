import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import type {AppDispatch, RootState} from "../store/store.ts";
import {createTask, getAllTasks, type Task} from "../slice/TaskSlice.ts";


interface TaskFormProps {
    onSubmit?: (taskData: TaskData) => void;
    initialData?: TaskDataWithId;
}

export interface TaskData {
    title: string;
    description: string;
    deadline: string;
    assignedTo: string;
    status: 'Pending' | 'In Progress' | 'Done';
}

export interface TaskDataWithId extends TaskData {
    id: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [form, setForm] = useState<TaskData>({
        title: '',
        description: '',
        deadline: '',
        assignedTo: '',
        status: 'Pending',
    });

    const [error, setError] = useState('');
    const { tasks, loading } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);


    useEffect(() => {
        if (initialData) {
            const { id, ...rest } = initialData;
            setForm(rest);
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };






    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.deadline || !form.assignedTo) {
            setError('Please fill all required fields.');
            return;
        }

        setError('');

        const newTask: TaskDataWithId = {
            ...form,
            id: initialData?.id || uuidv4(),
        };

        dispatch(createTask(newTask));

        // Optional callback
        if (onSubmit) {
            onSubmit(newTask);
        }

        // Clear form after submission (optional)
        if (!initialData) {
            setForm({
                title: '',
                description: '',
                deadline: '',
                assignedTo: '',
                status: 'Pending',
            });
        }
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-6 space-y-4 max-w-xl mx-auto"
            >
                <h2 className="text-xl font-semibold">
                    {initialData ? 'Edit Task' : 'Add New Task'}
                </h2>

                {error && <div className="text-red-500">{error}</div>}

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    rows={3}
                />

                <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="assignedTo"
                    value={form.assignedTo}
                    onChange={handleChange}
                    placeholder="Assigned To"
                    className="w-full border p-2 rounded"
                    required
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    {initialData ? 'Update Task' : 'Create Task'}
                </button>
            </form>

            {/* 📋 Task Cards */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                    <div className="col-span-full text-center">Loading tasks...</div>
                ) : !tasks || tasks.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">No tasks found.</div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="bg-white shadow rounded-xl p-4 space-y-2">
                            <h3 className="text-lg font-bold">{task.title}</h3>
                            <p className="text-gray-600">{task.description}</p>
                            <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                            <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                            <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                    task.status === 'Pending'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : task.status === 'In Progress'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-green-100 text-green-700'
                                }`}
                            >
                {task.status}
            </span>
                        </div>
                    ))
                )}

            </div>
        </div>


    );
};

export default TaskForm;

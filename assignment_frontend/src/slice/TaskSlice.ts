
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

export interface Task {
    id: string;
    title: string;
    description: string;
    deadline: string;
    assignedTo: string;
    status: 'Pending' | 'In Progress' | 'Done';
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};
const api =axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const createTask = createAsyncThunk(
    'task/createTask',
    async (task:Task,{rejectWithValue}) => {
        try {
            const response = await api.post('/task/createTask',task);
            return response.data;
        }catch (e) {
            console.log(e);
            return rejectWithValue('task add failed');
        }
    }
)
export const getAllTasks = createAsyncThunk(
    'task/getAllTasks',
    async () => {
        try {
            const response = await api.get('/task/getAllTasks');
            return response.data;
        }catch (e) {
            console.log(e);
        }
    }
)





const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })



            .addCase(createTask.fulfilled, (state, action: PayloadAction<Task | undefined>) => {
                if (action.payload) {
                    state.tasks.push(action.payload);
                }
            })


        // Update
            // .addCase(updateTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
            //     const index = state.tasks.findIndex(task => task.id === action.payload.id);
            //     if (index !== -1) {
            //         state.tasks[index] = action.payload;
            //     }
            // })
            //
            // // Delete
            // .addCase(deleteTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
            //     state.tasks = state.tasks.filter(task => task.id !== action.payload);
            // });
    },
});

export default taskSlice.reducer;

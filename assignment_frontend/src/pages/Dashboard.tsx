import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { UserIcon, AtSymbolIcon, IdentificationIcon, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import {useNavigate} from "react-router-dom";

interface User {
    id: string;
    email: string;
    name: string;
}

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/account', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
                setNameInput(response.data.user.name);
                setEmailInput(response.data.user.email);
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.message || 'Something went wrong');
            }
        };
        fetchAccount();
    }, [token]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    // update user

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/user/update/${user?.id}`, {
                name: nameInput,
                email: emailInput,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(response.data.user);
            alert('User updated successfully!');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to update user');
        }
    };
    // delete user

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/user/delete/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('User deleted successfully!');
            setUser(null);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to delete user');
        }
    };

    if (error) return <div className="text-red-600 text-center mt-8 font-semibold">Error: {error}</div>;
    if (!user) return <div className="text-center mt-8 text-gray-500">Loading your dashboard...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 p-4">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 w-full max-w-5xl">
                {/* User Summary */}
                <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-8 w-full md:w-1/2 transition duration-300 hover:shadow-pink-300">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-gradient-to-tr from-purple-400 to-indigo-500 p-4 rounded-full shadow-lg mb-4">
                            <UserIcon className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>
                        <p className="text-sm text-gray-600">Here is your account summary</p>
                    </div>

                    <div className="space-y-4 text-gray-700">
                        <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl shadow-sm">
                            <IdentificationIcon className="w-6 h-6 text-blue-600" />
                            <span><strong>ID:</strong> {user.id}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl shadow-sm">
                            <AtSymbolIcon className="w-6 h-6 text-green-600" />
                            <span><strong>Email:</strong> {user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl shadow-sm">
                            <UserIcon className="w-6 h-6 text-purple-600" />
                            <span><strong>Name:</strong> {user.name}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl shadow-sm">
                            <CalendarDaysIcon className="w-6 h-6 text-pink-600" />
                            <span><strong>Date:</strong> {currentDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/70 p-3 rounded-xl shadow-sm">
                            <ClockIcon className="w-6 h-6 text-yellow-600" />
                            <span><strong>Time:</strong> {currentDate.toLocaleTimeString()}</span>
                        </div>
                    </div>

                    {/* Update Form */}
                    <div className="mt-6 space-y-3">
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="w-full p-2 rounded border"
                            placeholder="Update name"
                        />
                        <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full p-2 rounded border"
                            placeholder="Update email"
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calendar Section */}
                <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl p-6 w-full md:w-1/2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center"> Calendar</h3>
                    <Calendar
                        className="rounded-xl w-full"
                        value={currentDate}
                        onChange={(date: Date) => setCurrentDate(date)}
                    />
                </div>
                <button
                    onClick={() => navigate('/task-management')}
                    className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Go to Task Management
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

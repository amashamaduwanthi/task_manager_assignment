import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from 'react-router';
import './App.css'
import AuthLayout from "./components/AuthLayOut.tsx";

import {store} from "./store/store.ts";

import Signup from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import TaskManagement from "./pages/TaskManagement.tsx";

function App() {
    const routes=createBrowserRouter([
        {
            path: "",
            element: <AuthLayout />,
            children: [
                { path: "/signin", element: <SignIn /> },
                { path: "", element: <Signup /> },
                { path: "/Dashboard", element: <Dashboard /> },
                {path: "/task-management", element: <TaskManagement />}
            ],
        },



    ])


    return (
        <>
            <Provider store={store}>
                <RouterProvider router={routes}/>
            </Provider>
        </>
    )
}

export default App

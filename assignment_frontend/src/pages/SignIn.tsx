import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import type { AppDispatch } from "../store/store.ts";
import type { User } from "../model/User.ts";
import { loginUser } from "../slice/UserSlice.ts";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = { email, password};

        dispatch(loginUser(user))
            .unwrap()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: "You are successfully logged in!",
                    confirmButtonColor: "#3085d6",
                }).then(() => {
                    navigate("/Dashboard");
                });
            })
            .catch((error) => {
                console.error("Error Logging in: ", error);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error || "An error occurred while logging in. Please try again.",
                });
            });
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                {/* Left Image Section */}
                <div className="hidden md:block">
                    <img
                        src="src/assets/4860253.jpg"
                        alt="Login Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Form Section */}
                <div className="p-10 flex flex-col justify-center text-white bg-white/10 backdrop-blur-lg">
                    <h2 className="text-4xl font-extrabold mb-6 text-center">Welcome Back</h2>
                    <p className="text-sm text-center mb-8">Login to your account</p>

                    <form onSubmit={handleLogIn} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/90 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-lg shadow-md transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6">
                        Don’t have an account?{" "}
                        <Link to="" className="underline hover:text-pink-300">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

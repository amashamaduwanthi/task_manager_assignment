import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import type {User} from "../model/User.ts";
import { registerUser } from "../slice/UserSlice.ts";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

    const handleRegister = (e) => {
        e.preventDefault();

        setErrors({});

        if (!name||!email || !password ) {
            Swal.fire({
                icon: 'warning',
                title: 'Validation Error',
                text: 'All fields are required. Please fill in all the fields before saving.',
                confirmButtonColor: '#3085d6',
            });
            return;
        }
        const user: User = { name:name,email: email, password: password };
        dispatch(registerUser(user) as any)
            .then((res: any) => {
                // If backend returns validation errors
                if (res?.payload?.errors) {
                    setErrors(res.payload.errors);
                    return;
                }

                if (res?.error) {
                    throw new Error(res.error.message || 'Unknown error');
                }

                Swal.fire({
                    icon: 'success',
                    title: 'User Registered!',
                    text: 'The user has been successfully registered.',
                    confirmButtonColor: '#3085d6',
                }).then(() => {
                    navigate("/SignIn");
                });
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: 'An error occurred while registering. Please try again.',
                });
            });
    };
    return (
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-5">
            <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-white/30">
                <div className="w-1/2 hidden md:block">
                    <img
                        src="src/assets/signup.jpg"
                        alt="Signup"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-10 text-white flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold mb-6 text-center">Create Account</h1>
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label className="block text-sm font-semibold mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                required
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter a password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transition duration-300"
                        >
                            Sign Up
                        </button>

                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <Link to="/SignIn" className="underline hover:text-pink-300">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

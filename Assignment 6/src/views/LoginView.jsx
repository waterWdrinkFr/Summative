import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black p-8 rounded-lg shadow-lg w-[400px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h1>
                <form onSubmit={(e) => { e.preventDefault(); navigate("/"); }} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
                        Login
                    </button>
                </form>
                <p
                    className="text-sm text-center text-gray-600 mt-4"> Don't have an account?
                    <span onClick={() => navigate("/register")}
                        className="text-blue-600 underline cursor-pointer">
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginView;
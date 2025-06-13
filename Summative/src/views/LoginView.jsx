import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.jsx";

function LoginView() {
    const { setUser } = useStoreContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const emailLogin = async (e) => {
        e.preventDefault();
        try {
            const user = (await signInWithEmailAndPassword(auth, email, password)).user;
            setUser(user);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                setError("Incorrect password.");
            } else if (error.code === "auth/user-not-found") {
                setError("No account found with this email.");
            } else if (error.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError("Login failed. Please try again.");
                console.error("Login error:", error);
            }
        }
    };

    async function googleLogin() {
        try {
            const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
            setUser(user);
            navigate("/");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black p-8 rounded-lg shadow-lg w-[400px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h1>
                <form onSubmit={emailLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="mt-[5%] ml-[8%] w-[84%] bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center mb-4 mt-4">
                    <button
                        type="button"
                        onClick={() => googleLogin()}
                        className="bg-white text-black px-12 py-2 rounded-md shadow flex items-center cursor-pointer"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 underline cursor-pointer"
                    >
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginView;
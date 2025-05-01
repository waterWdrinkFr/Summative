import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterView() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black p-8 rounded-lg shadow-lg w-[400px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="first name" className="block text-sm font-medium text-white">
                            Name
                        </label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-md bg-white" placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="last name" className="block text-sm font-medium text-white">
                            Last Name
                        </label>
                        <input type="text" id="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-md bg-white" placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-md bg-white" placeholder="Enter your email" required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-md bg-white" placeholder="Enter your password" required
                        />
                    </div>
                    <div>
                        <label htmlFor="re_enterPassword" className="block text-sm font-medium text-white">
                            Re-enter Password
                        </label>
                        <input type="password" id="passwordConfirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 rounded-md bg-white" placeholder="Enter your password" required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer" >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600"> Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-blue-600 underline cursor-pointer" > Login here </span>
                </p>
            </div>
        </div>
    );
}

export default RegisterView;
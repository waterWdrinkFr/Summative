import { useNavigate } from "react-router-dom";

function ErrorView() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black p-8 rounded-lg shadow-lg w-[400px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Error</h1>
                <p className="text-white text-center mb-4">An error occurred. Please try again later.</p>
                <button onClick={() => navigate("/")} className="w-full bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
                    Return to Home
                </button>
            </div>
        </div>
    );
}

export default ErrorView;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import axios from "axios";

function RegisterView() {
    const { name, setName, lastName, setLastName, email, setEmail, password, setPassword, selectedGenres, setSelectedGenres } = useStoreContext();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
                );
                const availableGenres = data.genres.filter((genre) =>
                    [28, 12, 16, 10751, 14, 36, 27, 9648, 878, 10752, 37, 80].includes(genre.id)
                );
                setGenres(availableGenres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const toggleSelectedGenre = (id, name) => {
        if (selectedGenres.has(id)) {
            setSelectedGenres(selectedGenres.delete(id));
        } else {
            setSelectedGenres(selectedGenres.set(id, name));
        }
    };

    const isGenreSelected = (id) => selectedGenres.has(id);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedGenres.size < 5) {
            alert("Please select at least 5 genres.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black px-12 py-4 rounded-lg shadow-lg w-[600px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { id: "name", label: "Name", value: name, setValue: setName, type: "text", placeholder: "Enter your first name" },
                        { id: "lastName", label: "Last Name", value: lastName, setValue: setLastName, type: "text", placeholder: "Enter your last name" },
                        { id: "email", label: "Email", value: email, setValue: setEmail, type: "email", placeholder: "Enter your email" },
                        { id: "password", label: "Password", value: password, setValue: setPassword, type: "password", placeholder: "Enter your password" },
                        { id: "confirmPassword", label: "Confirm Password", value: confirmPassword, setValue: setConfirmPassword, type: "password", placeholder: "Re-enter your password" }
                    ].map(({ id, label, value, setValue, type, placeholder }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-base font-medium text-white">{label}</label>
                            <input
                                id={id}
                                type={type}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={placeholder}
                                required
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            />
                        </div>
                    ))}
                    <div>
                        <h2 className="text-base font-sm text-white mt-4 mb-4">Select Genres</h2>
                        <ul className="grid grid-cols-3 gap-4">
                            {genres.map(({ id, name }) => (
                                <li key={id}>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isGenreSelected(id)}
                                            onChange={() => toggleSelectedGenre(id, name)}
                                            className="mr-2"
                                        />
                                        <span className={`text-sm font-bold cursor-pointer whitespace-nowrap ${isGenreSelected(id) ? "text-sky-600" : "text-white"}`}>
                                            {name}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="mt-4 w-full bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
                        Register
                    </button>
                </form>
                <p className="mt-3 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-blue-600 underline cursor-pointer">
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}

export default RegisterView;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import axios from "axios";

function RegisterView() {
    const { setName, setLastName, setEmail, setPassword, availableGenres, setAvailableGenres, selectedGenres, setSelectedGenres } = useStoreContext(); 
    const [localName, setLocalName] = useState("");
    const [localLastName, setLocalLastName] = useState("");
    const [localEmail, setLocalEmail] = useState("");
    const [localPassword, setLocalPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
                );
                setAvailableGenres(
                    response.data.genres.filter((genre) =>
                        [28, 12, 16, 80, 10751, 14, 36, 27, 9648, 878, 10752, 37].includes(genre.id)
                    )
                );
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const toggleSelectGenre = (genreId, genreName) => {
        const updatedGenres = new Map(selectedGenres);
        if (updatedGenres.has(genreId)) {
            updatedGenres.delete(genreId);
        } else {
            updatedGenres.set(genreId, genreName);
        }
        setSelectedGenres(updatedGenres);
    };

    const isGenreSelected = (genreId) => selectedGenres.has(genreId);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedGenres.size < 5) {
            alert("Please select at least 5 genres before registering.");
            return;
        }
        if (localPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setName(localName);
        setLastName(localLastName);
        setEmail(localEmail);
        setPassword(localPassword);

        const firstGenreId = selectedGenres.keys().next().value;
        if (firstGenreId) {
            navigate(`/movies/genres/${firstGenreId}`);
        } else {
            alert("No genres selected.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black px-12 py-4 rounded-lg shadow-lg w-[600px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="first name"
                            className="block text-base font-medium text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name" value={localName} onChange={(e) => setLocalName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="last name"
                            className="block text-base font-medium text-white">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last name"
                            value={localLastName} onChange={(e) => setLocalLastName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-base font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={localEmail} onChange={(e) => setLocalEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-base font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={localPassword} onChange={(e) => setLocalPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm password"
                            className="block text-base font-medium text-white">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>
                    <div>
                        <h2 className="block text-base font-medium text-white mt-4 mb-4">Select Genres</h2>
                        <ul className="grid grid-cols-2 gap-4">
                            {availableGenres.map((genre) => (
                                <li key={genre.id}>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isGenreSelected(genre.id)}
                                            onChange={() => toggleSelectGenre(genre.id, genre.name)}
                                            className="mr-2"
                                        />
                                        <span
                                            className={`text-xl font-bold cursor-pointer whitespace-nowrap ${isGenreSelected(genre.id) ? "text-sky-600" : "text-white"
                                                }`}
                                        >
                                            {genre.name}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
                        Register
                    </button>
                </form>
                <p className="mt-3 text-base text-center text-gray-600"> Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="text-blue-600 underline cursor-pointer"> Login here </span>
                </p>
            </div>
        </div>
    );
}

export default RegisterView;
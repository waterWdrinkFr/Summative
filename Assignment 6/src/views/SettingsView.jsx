import { useStoreContext } from "../context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SettingsView() {
    const { name, setName, lastName, setLastName, email, selectedGenres, setSelectedGenres } = useStoreContext();
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
                );
                const availableGenres = data.genres.filter((genre) =>
                    [28, 12, 16, 80, 10751, 14, 36, 27, 9648, 878, 10752, 37].includes(genre.id)
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

    const handleSave = (e) => {
        e.preventDefault();

        if (selectedGenres.size < 5) {
            alert("Please select at least 5 genres.");
            return;
        }
        navigate("/");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black px-12 py-6 rounded-lg shadow-lg w-[600px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Settings</h1>

                {/* Fixed: Now just directly using handleSave as the onSubmit handler */}
                <form onSubmit={handleSave} className="space-y-4">
                    {[
                        { id: "email", label: "Email", value: email, type: "email", placeholder: "Email", disabled: true, pointerEvents: 'none' },
                        { id: "name", label: "Name", value: name, setValue: setName, type: "text", placeholder: "Enter your first name" },
                        { id: "lastName", label: "Last Name", value: lastName, setValue: setLastName, type: "text", placeholder: "Enter your last name" }
                    ].map(({ id, label, value, setValue, type, placeholder, disabled }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-base font-medium text-white">{label}</label>
                            <input
                                id={id}
                                type={type}
                                value={value}
                                onChange={(e) => setValue && setValue(e.target.value)}
                                placeholder={placeholder}
                                disabled={disabled}
                                required
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            />
                        </div>
                    ))}

                    <div>
                        <h2 className="text-base font-medium text-white mt-4 mb-4">Selected Genres</h2>
                        <ul className="grid grid-cols-2 gap-4">
                            {genres.map(({ id, name }) => (
                                <li key={id}>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isGenreSelected(id)}
                                            onChange={() => toggleSelectedGenre(id, name)}
                                            className="mr-2"
                                        />
                                        <span className={`text-xl font-bold cursor-pointer whitespace-nowrap ${isGenreSelected(id) ? "text-sky-600" : "text-white"}`}>
                                            {name}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
                        Save
                    </button>

                </form>
            </div>
        </div>
    );
}

export default SettingsView;
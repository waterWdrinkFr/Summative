import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase.jsx";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { set } from "immutable";

function RegisterView() {
    const { setUser, selectedGenres, setSelectedGenres } = useStoreContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            setSelectedGenres([]);
        }
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
        if (selectedGenres.some(g => g.id === id)) {
            setSelectedGenres(selectedGenres.filter(g => g.id !== id));
        } else {
            setSelectedGenres([...selectedGenres, { id, name }]);
        }
    };

    const isGenreSelected = (id) => selectedGenres.some(g => g.id === id);

    const emailRegister = async (e) => {
        e.preventDefault();

        if (selectedGenres.length < 5) {
            alert("Please select at least 5 genres.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        else {
            try {
                const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
                await updateProfile(user, { displayName: `${firstName} ${lastName}` });
                setUser(user);
                setSelectedGenres(selectedGenres);
                const docRef = doc(firestore, "users", user.uid);
                await setDoc(docRef, { genres: selectedGenres });
                navigate(`/movies/genres/${selectedGenres[0]?.id}`);
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    alert("This email is already registered. Please log in or use a different email.");
                } else {
                    console.error("Error during registration:", error);
                    alert("Registration failed. Please try again.");
                }
            }
        }
    };

    async function googleRegister() {
        if (selectedGenres.length < 5) {
            alert("Please select at least 5 genres.");
            return;
        }
        else {
            try {
                const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
                setUser(user);
                setSelectedGenres(selectedGenres);
                const docRef = doc(firestore, "users", user.uid);
                await setDoc(docRef, { genres: selectedGenres, purchases: [] });
                navigate(`/movies/genres/${selectedGenres[0]?.id}`);
            } catch (error) {
                console.error("Error signing in with Google:", error);
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black px-12 py-4 rounded-lg shadow-lg w-[600px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Register</h1>
                <form onSubmit={emailRegister} className="space-y-4">
                    {[
                        { id: "name", label: "Name", value: firstName, setValue: setFirstName, type: "text", placeholder: "Enter your first name" },
                        { id: "lastName", label: "Last Name", value: lastName, setValue: setLastName, type: "text", placeholder: "Enter your last name" },
                        { id: "email", label: "Email", value: email, setValue: setEmail, type: "email", placeholder: "Enter your email" },
                        { id: "password", label: "Password (at least 6 characters)", value: password, setValue: setPassword, type: "password", placeholder: "Enter your password" },
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
                    <button type="submit" className="ml-[21.5%] mt-4 w-[57%] bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
                        Register
                    </button>
                </form>
                <div className="flex justify-center mb-4 mt-4">
                    <button
                        type="button"
                        onClick={() => googleRegister()}
                        className="bg-white text-black px-12 py-2 rounded-md shadow flex items-center cursor-pointer"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign up with Google
                    </button>
                </div>
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
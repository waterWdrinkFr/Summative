import { useStoreContext } from "../context/context.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.jsx";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase.jsx";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

function SettingsView() {
    const { selectedGenres, setSelectedGenres, purchases } = useStoreContext();
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [firstName, setFirstName] = useState(auth.currentUser.displayName.trim().split(" ")[0]);
    const [lastName, setLastName] = useState(auth.currentUser.displayName.trim().split(" ")[1]);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const purchaseList = purchases ? purchases.toArray() : [];

    useEffect(() => {
        const fetchGenresAndUserGenres = async () => {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`
                );
                const availableGenres = data.genres.filter((genre) =>
                    [28, 12, 16, 80, 10751, 14, 36, 27, 9648, 878, 10752, 37].includes(genre.id)
                );
                setGenres(availableGenres);

                const docRef = doc(firestore, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSelectedGenres(docSnap.data().genres || []);
                } else {
                    setSelectedGenres([]);
                }
            } catch (error) {
                console.error("Error fetching genres or user genres:", error);
            }
        };

        const fetchPurchaseHistory = async () => {
            try {
                const docRef = doc(firestore, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().purchaseHistory) {
                    setPurchaseList(docSnap.data().purchaseHistory);
                } else {
                    setPurchaseList([]);
                }
            } catch (error) {
                console.error("Error fetching purchase history:", error);
            }
        };

        fetchGenresAndUserGenres();
        fetchPurchaseHistory();
        console.log("purchaseList", purchaseList, purchaseList.length);
    }, []);

    const toggleSelectedGenre = (id, name) => {
        if (selectedGenres.some(g => g.id === id)) {
            setSelectedGenres(selectedGenres.filter(g => g.id !== id));
        } else {
            setSelectedGenres([...selectedGenres, { id, name }]);
        }
    };

    const isGenreSelected = (id) => selectedGenres.some(g => g.id === id);

    const handleSave = async (e) => {
        e.preventDefault();

        if (selectedGenres.length < 5) {
            alert("Please select at least 5 genres.");
            return;
        }

        try {
            await updateProfile(auth.currentUser, {
                displayName: `${firstName} ${lastName}`
            });
            const docRef = doc(firestore, "users", auth.currentUser.uid);
            await setDoc(docRef, { genres: selectedGenres }, { merge: true });

            alert("Changes saved successfully");
            navigate("/");
        } catch (error) {
            alert("Failed to update profile.");
            console.error("Error updating profile:", error);
        }
    };

    const isEmailUser = auth.currentUser.providerData.some(
        (provider) => provider.providerId === "password"
    );

    const handleSavePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
            alert("Password updated successfully");
            setShowPasswordFields(false);
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                alert("Current password is incorrect.");
            } else {
                alert("Failed to update password.");
                console.error("Error updating password:", error);
            }
        }
    }   

    return (
        <div className="mt-0 flex justify-center items-center h-screen bg-gradient-to-b from-black to-blue-600">
            <div className="bg-black px-12 py-6 rounded-lg shadow-lg w-[600px]">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Settings</h1>
                <form onSubmit={handleSave} className="space-y-4">
                    {[
                        { id: "email", label: "Email", value: auth.currentUser?.email || "", type: "email", placeholder: "Email", disabled: true, pointerEvents: 'none' },
                        { id: "name", label: "Name", value: firstName, setValue: setFirstName, type: "text", placeholder: "Enter your first name" },
                        { id: "lastName", label: "Last Name", value: lastName, setValue: setLastName, type: "text", placeholder: "Enter your last name" }
                    ].map(({ id, label, value, setValue, type, placeholder, disabled }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-md font-bold text-white">{label}</label>
                            <input
                                id={id}
                                type={type}
                                value={value}
                                onChange={(e) => setValue && setValue(e.target.value)}
                                placeholder={placeholder}
                                disabled={disabled}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                            />
                        </div>
                    ))}

                    {isEmailUser && (
                        <div className="relative mb-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    if (showPasswordFields) {
                                        handleSavePassword(e);
                                    } else {
                                        setShowPasswordFields((prev) => !prev);
                                    }
                                }}
                                className="mb-2 w-full text-left bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
                            >
                                {showPasswordFields ? "Save ▲" : "Change Password ▼"}
                            </button>
                            {showPasswordFields && (
                                <div
                                    className="absolute top-7.5 left-0 w-full bg-gray-700 p-4 rounded-md z-50"
                                    style={{ position: "absolute" }}
                                >
                                    <div>
                                        <label htmlFor="current-password" className="block text-base font-medium text-white">
                                            Current Password
                                        </label>
                                        <input
                                            id="current-password"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="new-password" className="block text-base font-medium text-white">
                                            New Password
                                        </label>
                                        <input
                                            id="new-password"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block text-base font-medium text-white">
                                            Confirm New Password
                                        </label>
                                        <input
                                            id="confirm-password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm new password"
                                            className="mt-1 block w-full px-4 py-2 rounded-md bg-white"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <h2 className="text-xl font-bold text-white mt-4 mb-4">Selected Genres</h2>
                        <ul className="grid grid-cols-3 gap-x-12 gap-y-2">
                            {genres.map(({ id, name }) => (
                                <li key={id}>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isGenreSelected(id)}
                                            onChange={() => toggleSelectedGenre(id, name)}
                                            className="mr-2"
                                        />
                                        <span
                                            className={`text-md font-bold cursor-pointer whitespace-nowrap ${isGenreSelected(id) ? "text-sky-600" : "text-white"
                                                }`}
                                        >
                                            {name}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
                        Save Changes
                    </button>

                </form>

                <div className="mt-8">
                    <h2 className="text-xl font-bold text-white mb-4">Purchase History</h2>
                    <div className="w-full overflow-x-auto">
                        <ul className="flex space-x-4">
                            {purchaseList.map(([id, movie]) => (
                                <li key={id} className="mb-2 bg-gray-800 text-white p-2 rounded-lg shadow-md flex-shrink-0 w-25">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w154${movie.poster}`}
                                        alt={movie.title}
                                        className="h-35 object-cover rounded mb-2"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsView;
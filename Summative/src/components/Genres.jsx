import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";

function GenresList({ onGenreSelect }) {
    const { selectedGenres } = useStoreContext();
    const navigate = useNavigate();

    const handleGenreClick = (genreId) => {
        navigate(`/movies/genres/${genreId}`);

        if (onGenreSelect) {
            onGenreSelect(genreId);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {selectedGenres.length > 0 ? (
                    selectedGenres.map(({ id, name }) => (
                        <button
                            key={id}
                            onClick={() => handleGenreClick(id)}
                            className="w-[200px] py-2 mb-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md cursor-pointer"
                        >
                            {name}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-400">No genres selected.</p>
                )}
            </div>
        </div>
    );
}

export default GenresList;
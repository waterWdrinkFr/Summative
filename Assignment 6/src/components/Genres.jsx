import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";

function GenresList({ onGenreSelect }) {
    const { selectedGenres: setSelectedGenres } = useStoreContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (setSelectedGenres.size === 0) {
            navigate("/register");
        }
    }, [setSelectedGenres, navigate]);

    const handleGenreClick = (genreId) => {
        navigate(`/movies/genres/${genreId}`);

        if (onGenreSelect) {
            onGenreSelect(genreId);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {setSelectedGenres.size > 0 ? (
                    setSelectedGenres.entrySeq().map(([genreId, genreName]) => (
                        <button
                            key={genreId}
                            onClick={() => handleGenreClick(genreId)}
                            className="w-[200px] py-2 mb-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                        >
                            {genreName}
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
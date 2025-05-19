import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";

function GenresList({ onGenreSelect }) {
    const { selectedGenres } = useStoreContext();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (selectedGenres.size === 0) {
    //         navigate("/login");
    //     }
    // }, [selectedGenres, navigate]);

    const handleGenreClick = (genreId) => {
        navigate(`/movies/genres/${genreId}`);

        if (onGenreSelect) {
            onGenreSelect(genreId);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {selectedGenres.size > 0 ? (
                    selectedGenres.entrySeq().map(([genreId, genreName]) => (
                        <button
                            key={genreId}
                            onClick={() => handleGenreClick(genreId)}
                            className="w-[200px] py-2 mb-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md cursor-pointer"
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
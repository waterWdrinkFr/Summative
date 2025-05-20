import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreContext } from "../context";

function SearchView() {
	const { query } = useParams();
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);
	const { cart, setCart } = useStoreContext();

	useEffect(() => {
		if (query) {
			fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${encodeURIComponent(
					query
				)}&page=${page}&include_adult=false`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.results) {
						setResults(data.results);
					} else {
						setResults([]);
					}
				})
				.catch((err) => {
					console.error("Fetch failed:", err);
					setResults([]);
				});
		}
	}, [query, page]);

	const handleAddToCart = (movie) => {
		const updatedCart = new Map(cart || new Map());
		updatedCart.set(movie.id.toString(), {
			id: movie.id,
			title: movie.title,
			poster: movie.poster_path,
		});
		setCart(updatedCart);
	};

	const isInCart = (movieId) => {
		return cart instanceof Map && cart.has(movieId.toString());
	};

	return (
		<div className="mt-[120px]">
			<h2 className="text-2xl font-bold text-white ml-6 mb-4">Results for "{query}"</h2>
			<div className="ml-[70px] grid grid-cols-4 gap-4">
				{results.map((movie) => (
					<div key={movie.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
						<Link to={`/movies/details/${movie.id}`}>
							{movie.poster_path ? (
								<img
									src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
									alt={movie.title}
									className="w-full h-[80%] rounded-md mb-2 object-cover"
								/>
							) : (
								<div className="w-full h-[80%] rounded-md mb-2 bg-gray-700 flex items-center justify-center text-gray-300 text-sm italic">
									Poster Unavailable
								</div>
							)}
						</Link>
						<p className="text-sm font-semibold">{movie.title}</p>
						<button
							onClick={() => handleAddToCart(movie)}
							disabled={isInCart(movie.id)}
							className={`w-full mt-2 px-6 py-2 text-base font-bold rounded-lg ${isInCart(movie.id)
								? "bg-gray-500 cursor-not-allowed"
								: "bg-blue-700 hover:bg-blue-800 cursor-pointer"
								}`}
						>
							{isInCart(movie.id) ? "Added to Cart" : "Buy - $$$"}
						</button>
					</div>
				))}
			</div>
			<button onClick={() => setPage(page - 1)} disabled={page === 1}
				className="mt-4 ml-95.5 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer" >
				Previous
			</button>
			<button onClick={() => setPage(page + 1)}
				className="mt-2 ml-4 px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer" >
				Next
			</button>
			<span className="ml-64 text-white">Page {page}</span>
		</div>
	);
}

export default SearchView;
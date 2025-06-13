import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreContext } from "../context/context.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";

function SearchView() {
	const { query } = useParams();
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const { cart, setCart } = useStoreContext();
	const totalPages = useRef(1);

	useEffect(() => {
		if (query) {
			setLoading(true);
			fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
			)
				.then((res) => res.json())
				.then((data) => {
					if (data.results) {
						setResults(data.results);
						totalPages.current = data.total_pages || 1;
					} else {
						setResults([]);
					}
					setLoading(false);
				})
				.catch((err) => {
					console.error("Fetch failed:", err);
					setResults([]);
					setLoading(false);
				});
		}
	}, [query, page]);

	const handlePageChange = (direction) => {
		const nextPage = page + direction;
		if (nextPage > 0 && nextPage <= totalPages.current) {
			setPage(nextPage);
		}
	};

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
		<>
			<Header />
			<div className="mt-[120px] min-h-screen">
				<h2 className="text-2xl font-bold text-white ml-5 mb-4">Results for "{query}"</h2>
				{!loading && results.length > 0 ? (
					<div className="w-[96%] ml-6 grid grid-cols-5 gap-4">
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
								<button
									onClick={() => handleAddToCart(movie)}
									disabled={isInCart(movie.id)}
									className={`w-full mt-2 px-6 py-2 text-base font-bold rounded-lg ${isInCart(movie.id)
										? "bg-gray-500 cursor-not-allowed"
										: "bg-blue-700 hover:bg-blue-800 cursor-pointer"
										}`}
								>
									{isInCart(movie.id) ? "Added" : "Buy"}
								</button>
							</div>
						))}
					</div>
				) : !loading && (
					<p className="text-white text-center text-lg mt-10">No movies found for "{query}".</p>
				)}
				<button
					onClick={() => handlePageChange(-1)}
					disabled={page === 1 || loading}
					className="mt-4 ml-115 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
				>
					Previous
				</button>
				<span className="ml-4 text-white">Page {page} of {totalPages.current}</span>
				<button
					onClick={() => handlePageChange(1)}
					disabled={page === totalPages.current || loading}
					className="mt-8 ml-4 px-8 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
				>
					Next
				</button>
			</div>
			<Footer />
		</>
	);
}

export default SearchView;
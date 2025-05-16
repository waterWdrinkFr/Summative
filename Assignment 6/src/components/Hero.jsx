import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Hero() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        (async function fetchMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
            );
            setMovies(response.data.results);
        })();
    }, []);

    return (
        <div className="relative top-[140px] w-full">
            <div className="absolute z-10 w-full text-center top-[5%] px-4">
                <div className="inline-block bg-blue-900/50 px-6 py-4 rounded-xl shadow-2xl">
                    <h1 className="text-[37.5px] text-white font-bold text-center drop-shadow-md"> Catch up on the Latest and Greatest Shows and Movies</h1>
                </div>
            </div>

            <Swiper modules={[Navigation, Pagination, Autoplay]} navigation autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true} className="w-full h-[650px]">
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="relative w-full h-full">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 w-full h-[100px] p-4 bg-gradient-to-t from-black to-transparent text-white">
                                <h2 className="mt-1 text-2xl font-bold">{movie.title}</h2>
                                <button className="px-4 py-2 bg-sky-600 text-white font-bold rounded-lg cursor-pointer"> Watch Now </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
}

export default Hero;
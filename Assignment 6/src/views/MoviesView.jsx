import { Outlet } from "react-router-dom";
import Genres from "../components/Genres.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function MoviesView() {
    return (
        <>
            <Header />
            <div className="flex">
                <aside className="mt-[100px] w-1/5 p-4 text-white border-r-2 border-blue-700">
                    <h1 className="text-3xl font-bold mb-8">Selected Genres</h1>
                    <Genres />
                </aside>
                <main className="w-3/4 p-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    );
}

export default MoviesView;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider, useStoreContext } from "./context";
import "./App.css";
import HomeView from "./views/HomeView.jsx";
import MoviesView from "./views/MoviesView.jsx";
import GenreView from "./views/GenreView.jsx";
import DetailView from "./views/DetailView.jsx";
import LoginView from "./views/LoginView.jsx";
import RegisterView from "./views/RegisterView.jsx";
import ErrorView from "./views/ErrorView.jsx";
import CartView from "./views/CartView.jsx";
import SettingsView from "./views/SettingsView.jsx";
import SearchView from "./views/SearchView.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

function App() {
    return (
        <StoreProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/register" element={<RegisterView />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/movies" element={<MoviesView />}>
                            <Route index element={<Navigate to={`/movies/genres/default`} replace />} />
                            <Route path="genres/:genre_id" element={<GenreView />} />
                            <Route path="details/:id" element={<DetailView />} />
                        </Route>
                        <Route path="movies/search/:query" element={<SearchView />} />
                        <Route path="/cart" element={<CartView />} />
                        <Route path="/settings" element={<SettingsView />} />
                    </Route>
                    <Route path="/*" element={<ErrorView />} />
                </Routes>
            </Router>
        </StoreProvider>
    );
}

export default App;
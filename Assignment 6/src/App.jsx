import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomeView from "./views/HomeView.jsx";
import MoviesView from "./Views/MoviesView.jsx";
import GenreView from "./views/GenreView.jsx";
import DetailView from "./views/DetailView.jsx";
import LoginView from "./views/LoginView.jsx";
import RegisterView from "./views/RegisterView.jsx";
import ErrorView from "./views/ErrorView.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/movies" element={<MoviesView />}>
                    <Route index element={<Navigate to="28" replace />} />
                    <Route path=":genre_id" element={<GenreView />} />
                    <Route path="details/:id" element={<DetailView />} />
                </Route>
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/*" element={<ErrorView />} />
            </Routes>
        </Router>
    );
}

export default App;
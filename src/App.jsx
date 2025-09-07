import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
                <Footer />
            </main>
        </Router>
    );
}

export default App;
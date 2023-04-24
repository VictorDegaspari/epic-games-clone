import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import './styles.css';

export default function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/game" element={<Game />}  />
                <Route path="/user" element={<User />}  />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}
import { Fragment } from 'react';
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Game from './pages/Games/Game';
import FindGame from './pages/Games/ManageGame';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/Users/User';
import './styles.css';

const PrivateRoute = () => {
    function isAuthenticated() {
        let token = localStorage.getItem('token');
        let email = localStorage.getItem('email');
        if (!token || !email) return false;
        return true;
    }

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default function App() {
    return (
        <Router>
        <Fragment>
            <Routes>
                <Route exact path='/' element={<PrivateRoute/>}>
                    <Route  exact path='/home' element={<Home/>}/>
                    <Route  path='/game' element={<Game/>}/>
                    <Route  path='/game/:id' element={<FindGame/>}/>
                    <Route  path='/user' element={<User/>}/>
                </Route>
                <Route exact path='/login' element={<Login/>}/>
            </Routes>
        </Fragment>
        </Router>
    );
}
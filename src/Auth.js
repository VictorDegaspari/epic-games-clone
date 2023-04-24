import { Navigate } from 'react-router-dom';
import { get } from "./js/index";

const Auth = async ({ Component }) => {
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";

    let isAuthenticated = false;

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token || !email) {
        isAuthenticated = false;
    } else {
        try {
            const user = await get(baseUrl + '/users/find/' + email);
            if (user.info?.type === 'Error') throw new Error();
            isAuthenticated = true;
        } catch (error) {
            localStorage.clear();
            isAuthenticated = false;
        }
    }

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default Auth;
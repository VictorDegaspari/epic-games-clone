import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from "../js/index";

export default function Login() {
    const navigate = useNavigate();
    const [ error, setError] = useState('');
    const [ isLogged, setIsLogged] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";
    const [ isAdmin, setIsAdmin] = useState(true);
    const errors = [
        { minLength: 'Preencha com pelo menos 3 caracteres!'},
        { authError: 'Senha ou Email estão incorretos!' }
    ];

    async function login() {
        if (
            !email || 
            !password || 
            email.length < 3 || 
            password.length < 3
        ) {
            setError(showError('minLength'));
            return;
        }

        try {
            setLoading(true);
            const response = await post(baseUrl + "/auth/login", { email: email, password: password }, false);
            if (response.info?.type === 'Error') throw new Error();
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user?._id);
            localStorage.setItem('admin', response.user?.admin);
            localStorage.getItem('admin') === 'true' ?  setIsAdmin(true) : setIsAdmin(false);
            localStorage.setItem('email', email);
            setIsLogged(true);
            setLoading(false);
            navigate('/home');
        } catch (error) {
            localStorage.clear();
            setLoading(false);
            console.error(error);
            setError(showError('authError'));
        }
    }

    function showError (error) {
        let showError = '';
        errors.forEach(element => {
            if (error in element) {
                showError = element[error];
            }
        });
        return showError;
    }

    return (
        <>
            <div id="login" className={ `flex flex-column show` }>
                <div className="content flex flex-column">
                    <a href="https://store-epicgames.com" target='_blank' rel="noreferrer" className="epicLogo cursor-pointer"> </a>
                    <input type="email" name="email" id="email" placeholder="E-mail" value={ email } onChange={ (event) => setEmail(event.target.value) }/>
                    <input type="password" name="password" id="password" placeholder="Senha" value={ password } onChange={ (event) => setPassword(event.target.value) }/>
                    { error && <small className="error" >{ error }</small> }
                    <button id="login-button" className="flex align-center justify-center" onClick={ () => login() }>
                        <div id="loader-login">
                            { loading && <div className="loader"></div> }
                        </div>
                        Entrar
                    </button>
                </div>
            </div>
        </>
    );
}

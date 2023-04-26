import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../js/index";

export default function User() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const jsonData = JSON.stringify(Object.fromEntries(data.entries()));
        postUser(JSON.parse(jsonData));
        console.log(jsonData);
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    async function postUser(data){   
        try {
            setLoading(true);
            const response = await post(baseUrl + '/users/post', data, false);
            setLoading(false);
            if (response.info?.type == 'Error') throw new Error();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
}
    return (
        <>
            <div id="show-user" className="flex flex-column w-100 show">
                { loading && <div id="loader-user">
                    <div className="loader" ></div>
                </div>}
                <form className="form-save-user w-100 flex-column show" onSubmit={ (event) => handleSubmit(event)}>
                    <h3>Cadastrar usuário</h3>
                    <label htmlFor="name" className="flex flex-column w-100">
                        Nome
                        <input name="name" type="text" placeholder="Nome" required onChange={handleInputChange}/>
                    </label>
                    <label htmlFor="email" className="flex flex-column w-100">
                        E-mail
                        <input name="email" type="email" placeholder="E-mail" required onChange={handleInputChange}/>
                    </label>
                    <label htmlFor="password" className="flex flex-column w-100">
                        Senha
                        <input name="password" type="password" placeholder="Senha" required onChange={handleInputChange}/>
                    </label>
                    <label htmlFor="password_c" className="flex flex-column w-100">
                        Confirmar senha
                        <input name="password_c" type="password" placeholder="Senha" required onChange={handleInputChange}/>
                    </label>
                    <button type="submit" className="w-100">SALVAR</button>
                </form>
                <button className="w-100" id="go-back-user" onClick={ () => navigate('/home')}><span>VOLTAR</span></button>
                <small id="form-user-error" className="error"></small>
          </div>
        </>
    );
}

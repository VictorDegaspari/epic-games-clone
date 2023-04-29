import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../js/index";

export default function Game() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({});
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";

    const handleSubmit = (event) => {
        setErrorMessage('');
        event.preventDefault();
        postGame(formData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function postGame(data){   
        try {
            if (data.title.length < 3 || data.url.length < 3 ) return setErrorMessage("Preencha a url e o titulo com no mínimo 3 caracteres")
            if (data.current_price.length < 2 || data.old_price.length < 2 ) return setErrorMessage("Preencha o Preço e o Preço antigo com no mínimo 2 caracteres")
            if (data.discount.length < 1) return setErrorMessage("Preencha o Desconto % com no mínimo 1 caractere")
            setLoading(true);
            const response = await post(baseUrl + '/games/post', data, false);
            setLoading(false);
            if (response.info?.type === 'Error') throw new Error();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    
    return (
        <>
            <div id="show-game" className="flex flex-column w-100 show">
                <div className="game-edit flex-column"></div>
                <form className="form-save-game w-100 flex-column show" onSubmit={ (event) => handleSubmit(event)} encType="multipart/form-data">
                        <h3>Cadastrar jogo</h3>
                        <label htmlFor="title" className="flex flex-column w-100">
                            Título
                            <input name="title" type="text" placeholder="Título" onChange={handleInputChange} />
                        </label>
                        <label htmlFor="current_price" className="flex flex-column w-100">
                            Preço
                            <input name="current_price" type="number" placeholder="Preço" onChange={handleInputChange}/>
                        </label>
                        <label htmlFor="url" className="flex flex-column w-100">
                            Imagem
                            <input name="url" type="text" placeholder="Imagem do jogo" onChange={handleInputChange}/>
                        </label>
                        <label htmlFor="discount" className="flex flex-column w-100">
                            Desconto
                            <input name="discount" type="number" placeholder="% do desconto" onChange={handleInputChange}/>
                        </label>
                        <label htmlFor="old_price" className="flex flex-column w-100">
                            Preço antigo
                            <input name="old_price" type="number" placeholder="Valor antigo do jogo" onChange={handleInputChange}/>
                        </label>
                    <button type="submit" className="save-button centralize">
                        SALVAR
                        { loading && 
                            <div className="loader ml-5 "></div>
                        }
                    </button>
                </form>
                <button className="w-100" id="go-back" onClick={ () => navigate('/home')}><span>VOLTAR</span></button>
                <small id="form-game-error" className="error">{ errorMessage }</small>
          </div>
        </>
    );
}

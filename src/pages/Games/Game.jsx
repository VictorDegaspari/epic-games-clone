import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../js/index";

export default function Game() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const jsonData = JSON.stringify(Object.fromEntries(data.entries()));
    postGame(JSON.parse(jsonData));
    console.log(jsonData);
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
            setLoading(true);
            const response = await post(baseUrl + '/games/post', data, false);
            setLoading(false);
            if (response.info?.type == 'Error') throw new Error();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
}
    
    return (
        <>
            <div id="show-game" className="flex flex-column w-100 show">
                <div className="game-edit flex-column"></div>
                { loading && <div id="loader-game">
                    <div className="loader"></div>
                </div> }
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
                    <button type="submit" className="save-button">SALVAR</button>
                </form>
                <button className="w-100" id="go-back" onClick={ () => navigate('/home')}><span>VOLTAR</span></button>
                <small id="form-game-error" className="error"></small>
          </div>
        </>
    );
}

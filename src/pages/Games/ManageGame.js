import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, remove, update } from "../../js/index";

export default function FindGame() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingGame, setLoadingGame] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isShowing, setIsShowing] = useState(true);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [gameData, setGameData] = useState({});
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";
    const idRef = useRef(id);

    useEffect(() => {
        async function openGameById() {
            if (!idRef.current) return;
            localStorage.setItem('gameId', idRef.current);
            setLoadingGame(true);

            const { game } = await get(baseUrl + '/games/find/' + encodeURI(idRef.current));
            setLoadingGame(false);
            if (!game) return;
            if (game.author?.email === localStorage.getItem('email')) {
                setIsAdmin(true);
            }
            const date = new Date(game.created);
            setFormattedDate(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
            setGameData(game);
        }
        openGameById();
    }, [id]);

    async function deleteGame() {
        setLoading(true);
        await remove(baseUrl + '/games/remove/' + encodeURI(id));
        setLoading(false);
        navigate('/home');
    }

    async function editGame(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await update(baseUrl + '/games/update/' + encodeURI(id), gameData, false);
            if (response.info?.type === 'Error') throw new Error();
            setLoading(false);
            setGameData(response.updatedGame);
            handleShow();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    } 

    const handleEdit = () => {
        setIsShowing(false);
        setIsEditing(true);
    }

    const handleShow = () => {
        setIsShowing(true);
        setIsEditing(false);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGameData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <div id="show-game" className="show flex flex-column w-100">
            { isShowing && 
                <div className="game-edit flex-column show" encType="multipart/form-data">
                        <h3>{ gameData.title }</h3>
                        { loadingGame && 
                            <div className="w-100 centralize flex">
                                <div className="loader ml-5 "></div>
                            </div>
                        }
                        <img src={ gameData.url } alt={ gameData.title } />

                        <div className="info">
                            <span>Autor</span> 
                            <span>{ gameData.author?.name }</span> 
                        </div>
                        <div className="info">
                            <span>Disponível</span> 
                            <span>{ formattedDate }</span> 
                        </div>
                        <div className="info">
                            <span>Valor</span> 
                            <span>{ gameData.current_price ? 'R$'+gameData.current_price : 'Grátis' }</span> 
                        </div>
                        { isAdmin ? 
                            <button className="w-100" id="start-edit" onClick={() => handleEdit()}><span>EDITAR</span></button> : ''
                        }
                        <button type="button" onClick={() => navigate('/home')}>VOLTAR</button>
                </div>
            }
            { isEditing &&
                <form className="form-edit-game w-100 flex-column show" encType="multipart/form-data" onSubmit={(e) => editGame(e)}>
                    <h3>Editar jogo</h3>
                    <label htmlFor="title" className="flex flex-column w-100">
                        Título
                        <input name="title" type="text" value={ gameData.title } placeholder="Título" required onChange={handleInputChange}/>
                    </label>
                    <label htmlFor="current_price" className="flex flex-column w-100">
                        Preço
                        <input name="current_price" type="number" value={ gameData.current_price } placeholder="Preço" required onChange={handleInputChange}/>
                    </label>
                    <label htmlFor="url" className="flex flex-column w-100">
                        URL da imagem
                        <input name="url" type="text" placeholder="Imagem do jogo" value={ gameData.url } required onChange={handleInputChange}/>
                    </label>
                    <label htmlFor="discount" className="flex flex-column w-100">
                        Desconto
                        <input name="discount"  value={ gameData.discount } type="number" placeholder="% do desconto" required onChange={handleInputChange}/>
                    </label>
                    <label htmlFor="old_price" className="flex flex-column w-100">
                        Preço antigo
                        <input name="old_price" value={ gameData.old_price } type="number" placeholder="Valor antigo do jogo" required onChange={handleInputChange}/>
                    </label>
                    <button type="button" onClick={() => handleShow()}>VOLTAR</button>
                    <button type="submit" className="save-button centralize">
                        SALVAR
                        { loading && 
                            <div className="loader ml-5 "></div>
                        }
                    </button>
                    <button type="button" id="delete-game" className="delete-button" onClick={() => setShowConfirmDelete(true)}>EXCLUIR</button>
                    { showConfirmDelete &&
                        <small className="confirm-delete show">Deseja realmente excluir?
                            <span className="yes-delete cursor-pointer" onClick={() => deleteGame()}>SIM</span>
                            <span className="no-delete cursor-pointer"  onClick={() => setShowConfirmDelete(false)}>NÃO</span>
                        </small>
                    }
                </form>
            }
            </div>
        </>
    );
}
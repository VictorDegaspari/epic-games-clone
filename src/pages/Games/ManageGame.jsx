import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, remove, update } from "../../js/index";

export default function FindGame() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isShowing, setIsShowing] = useState(true);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [gameData, setGameData] = useState({});
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";
    
    useEffect(() => {
        openGameById();
        if (gameData.author?.email === localStorage.getItem('email')) {
            setIsAdmin(true);
        }
    }, []);

    async function openGameById() {
        if (!id) return;
        localStorage.setItem('gameId', id);
        setLoading(true);

        const { game } = await get(baseUrl + '/games/find/' + encodeURI(id));
        setLoading(false);
        if (!game) return;
        const date = new Date(game.created);
        setFormattedDate(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
        setGameData(game);
    }

    async function deleteGame() {
        setLoading(true);
        await remove(baseUrl + '/games/remove/' + encodeURI(id));
        setLoading(false);
        navigate('/home');
    }

    async function editGame(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const jsonData = JSON.stringify(Object.fromEntries(data.entries()));
        setLoading(true);
        try {
            const response = await update(baseUrl + '/games/update/' + encodeURI(id), JSON.parse(jsonData), false);
            if (response.info?.type === 'Error') throw new Error();
            setLoading(true);
            setGameData(response.updatedGame);
            setIsShowing(true);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    } 

    const handleEdit = () => {
        setIsShowing(false);
        setIsEditing(true);
    }

    return (
        <>
            <div id="show-game" className="show flex flex-column w-100">
            { isShowing && 
                <form className="form-edit-game w-100 flex-column show" encType="multipart/form-data">
                        <h3>{ gameData.title }</h3>
                        <img src={ gameData.url } alt={ gameData.title } />
                        { isAdmin ? 
                            <button class="w-100" id="start-edit" onClick={() => handleEdit}><span>EDITAR</span></button> : ''
                        }

                        <div class="info">
                            <span>Autor</span> 
                            <span>{ gameData.author?.name }</span> 
                        </div>
                        <div class="info">
                            <span>Disponível</span> 
                            <span>{ formattedDate }</span> 
                        </div>
                        <div class="info">
                            <span>Valor</span> 
                            <span>{ gameData.current_price ? 'R$'+gameData.current_price : 'Grátis' }</span> 
                        </div>
                </form>
            }
            { isEditing &&
                <form className="form-edit-game w-100 flex-column show" encType="multipart/form-data" onSubmit={(e) => editGame(e)}>
                    <div id="data-rows-content">
                        <h3>Editar jogo</h3>
                        <label for="title" class="flex flex-column w-100">
                            Título
                            <input name="title" type="text" value={ gameData.title } placeholder="Título" required/>
                        </label>
                        <label for="current_price" class="flex flex-column w-100">
                            Preço
                            <input name="current_price" type="number" value={ gameData.current_price } placeholder="Preço" required/>
                        </label>
                        <label for="url" class="flex flex-column w-100">
                            Imagem
                            <input name="url" type="text" placeholder="Imagem do jogo" value={ gameData.url } required/>
                        </label>
                        <label for="discount" class="flex flex-column w-100">
                            Desconto
                            <input name="discount"  value={ gameData.discount } type="number" placeholder="% do desconto" required/>
                        </label>
                        <label for="old_price" class="flex flex-column w-100">
                            Preço antigo
                            <input name="old_price" value={ gameData.old_price } type="number" placeholder="Valor antigo do jogo" required/>
                        </label>
                        <button type="submit">SALVAR</button>
                        <button type="button" id="delete-game" class="delete-button" onClick={() => setShowConfirmDelete(true)}>EXCLUIR</button>
                        { showConfirmDelete &&
                            <small class="confirm-delete">Deseja realmente excluir?
                                <span class="yes-delete cursor-pointer" onClick={() => deleteGame()}>SIM</span>
                                <span class="no-delete cursor-pointer"  onClick={() => setShowConfirmDelete(false)}>NÃO</span>
                            </small>
                        }
                    </div>
                </form>
            }
            </div>
        </>
    );
}
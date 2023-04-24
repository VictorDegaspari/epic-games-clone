export default function Game() {
    return (
        <>
            <div id="show-game" className="flex flex-column w-100">
                <div className="game-edit flex-column"></div>
                <div id="loader-game">
                    <div className="loader"></div>
                </div>
                <form className="form-edit-game w-100 flex-column" encType="multipart/form-data"></form>
                <form className="form-save-game w-100 flex-column" encType="multipart/form-data">
                        <h3>Cadastrar jogo</h3>
                        <label htmlFor="title" className="flex flex-column w-100">
                            Título
                            <input name="title" type="text" placeholder="Título" />
                        </label>
                        <label htmlFor="current_price" className="flex flex-column w-100">
                            Preço
                            <input name="current_price" type="number" placeholder="Preço" />
                        </label>
                        <label htmlFor="url" className="flex flex-column w-100">
                            Imagem
                            <input name="url" type="text" placeholder="Imagem do jogo" />
                        </label>
                        <label htmlFor="discount" className="flex flex-column w-100">
                            Desconto
                            <input name="discount" type="number" placeholder="% do desconto" />
                        </label>
                        <label htmlFor="old_price" className="flex flex-column w-100">
                            Preço antigo
                            <input name="old_price" type="number" placeholder="Valor antigo do jogo" />
                        </label>
                    <button type="submit">SALVAR</button>
                </form>
                <button className="w-100" id="go-back"><span>VOLTAR</span></button>
                <small id="form-game-error" className="error"></small>
          </div>
        </>
    );
}

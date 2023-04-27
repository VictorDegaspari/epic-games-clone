export default function User() {
    return (
        <>
            <div id="show-user" className="flex flex-column w-100">
                <div id="loader-user">
                    <div className="loader"></div>
                </div>
                <form className="form-save-user w-100 flex-column">
                    <h3>Cadastrar usuário</h3>
                    <label htmlFor="name" className="flex flex-column w-100">
                        Nome
                        <input name="name" type="text" placeholder="Nome" required/>
                    </label>
                    <label htmlFor="email" className="flex flex-column w-100">
                        E-mail
                        <input name="email" type="email" placeholder="E-mail" required/>
                    </label>
                    <label htmlFor="password" className="flex flex-column w-100">
                        Senha
                        <input name="password" type="password" placeholder="Senha" required/>
                    </label>
                    <label htmlFor="password_c" className="flex flex-column w-100">
                        Confirmar senha
                        <input name="password_c" type="password" placeholder="Senha" required/>
                    </label>
                    <button type="submit" className="w-100">SALVAR</button>
                </form>
                <button className="w-100" id="go-back-user"><span>VOLTAR</span></button>
                <small id="form-user-error" className="error"></small>
          </div>
        </>
    );
}

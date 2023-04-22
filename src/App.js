import { useEffect, useState } from 'react';
import './App.css';
import { games, popularGames } from "./js/games-data.js";
import { get, post } from "./js/index";
import './styles.css';

export default function App() {
    const baseUrl = "https://epic-games-clone-wheat.vercel.app";
    const gamesData = games() || [];
    const popularGamesData = popularGames() || [];

    const [isLogged, setIsLogged] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);
    
    useEffect(() => {
        auth();
        carouselInit();
    });

    const gameContainers = gamesData.map((game) => (
        <div className="highlight-images w-100" key={ game.id }>
            <img alt={game.title} src={game.url} />
            <div className="base-game">JOGO BASE</div>
            <div className="game-name">{game.title}</div>
            <div className="flex">
                <div className={game.discount ? "discount" : "none"}>{game.discount}</div>
                <div className="price">
                    <span className={game.discount ? "old-price" : "none"}>
                    R$ {game.old_price}
                    </span>
                    <span className="current-price">R$ {game.current_price}</span>
                </div>
            </div>
        </div>
    ));
  
    const carouselBalls = popularGamesData.map((game, index) => (
      <div
        className={"balls " + (index === 0 ? "active" : "")}
        key={ game.id }
      ></div>
    ));
  
    const popularGamesContainers = popularGamesData.map((game, index) => (
        <div
            className={"carousel-games " + (index === 0 ? "active" : "")}
            key={ game.id }
        >
            <img src={game.url} alt={ game.title } />
            <h3>{game.description}</h3>
            <div className="games-info">{ game.title }</div>
        </div>
    ));
    async function auth() {
        let token = localStorage.getItem('token');
        let email = localStorage.getItem('email');
        if (!token || !email) {
            setIsLogged(false);
        } else {
            localStorage.getItem('admin') == 'true' ? setIsAdmin(true) : setIsAdmin(false);
            try {
                const user = await get(baseUrl + '/users/find/' + email);
                user ? setIsLogged(true) : setIsLogged(false);
                if (user.info?.type == 'Error') throw new Error();
            } catch (error) {
                setIsLogged(false);
                localStorage.clear();
            }
        }

        if (token && email) {
            setIsLogged(true);
            setEmail(email);
        } else {
            setIsLogged(false);
        }

        // ballsContainer.innerHTML = carouselBalls;
        // gamesContainer.innerHTML = gameContainers;
        // popularGamesContainer.innerHTML = popularGamesContainers;
        
        // let childrenBalls = Array.from(ballsContainer.children);
        // let childrenPopularGames = Array.from(popularGamesContainer.children);
        // let index = 0;
        // const activeDiv = document.createElement("div");
        // activeDiv.classList.add("carousel-progress");

        // childrenPopularGames[index].appendChild(activeDiv);
        // childrenBalls[index].classList.add('active');
        // childrenPopularGames[index].classList.add('active');
        // defineCarouselImg(childrenPopularGames[index]);

        // const activeInterval = setInterval(() => {
        //     childrenBalls[index].classList.remove('active');
        //     childrenPopularGames[index].classList.remove('active');
        //     index++;
        //     if (index == popularGamesData.length) { 
        //         index = 0;
        //         popularGamesContainer.scrollLeft = 1;
        //     }
        //     childrenBalls[index].classList.add('active');
        //     childrenPopularGames[index].classList.add('active');
        //     childrenPopularGames[index].appendChild(activeDiv);
        //     defineCarouselImg(childrenPopularGames[index]);
        //     popularGamesContainer.scrollLeft += (img.offsetWidth + 30);
            
        // }, 8000);

    }
    
    function carouselInit() {
        // ballsContainer.innerHTML = carouselBalls;
        // gamesContainer.innerHTML = gameContainers;
        // popularGamesContainer.innerHTML = popularGamesContainers;
        
        // let childrenBalls = Array.from(ballsContainer.children);
        // let childrenPopularGames = Array.from(popularGamesContainer.children);
        // let index = 0;
        // const activeDiv = document.createElement("div");
        // activeDiv.classList.add("carousel-progress");

        // childrenPopularGames[index].appendChild(activeDiv);
        // childrenBalls[index].classList.add('active');
        // childrenPopularGames[index].classList.add('active');
        // defineCarouselImg(childrenPopularGames[index]);

        // const activeInterval = setInterval(() => {
        //     childrenBalls[index].classList.remove('active');
        //     childrenPopularGames[index].classList.remove('active');
        //     index++;
        //     if (index == popularGamesData.length) { 
        //         index = 0;
        //         popularGamesContainer.scrollLeft = 1;
        //     }
        //     childrenBalls[index].classList.add('active');
        //     childrenPopularGames[index].classList.add('active');
        //     childrenPopularGames[index].appendChild(activeDiv);
        //     defineCarouselImg(childrenPopularGames[index]);
        //     popularGamesContainer.scrollLeft += (img.offsetWidth + 30);
            
        // }, 8000);
    }

    async function login() {

        if (
            !email || 
            !password || 
            email.length < 3 || 
            password.length < 3
        ) {
            // messageMinLength.classList.add('show');
            return;
        }

        try {
            const response = await post(baseUrl + "/auth/login", { email: email, password: password }, false);
            if (response.info?.type == 'Error') throw new Error();
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user?._id);
            localStorage.setItem('admin', response.user?.admin);
            localStorage.getItem('admin') == 'true' ?  setIsAdmin(true) : setIsAdmin(false);
            localStorage.setItem('email', email);
            setIsLogged(true);
        } catch (error) {
            localStorage.clear();
            console.error(error);
        }
    }
  return (
    <div className="App">
        <div id="login" className={ `flex flex-column ${ !isLogged ? 'show' : '' }` }>
          <div className="content flex flex-column">
            <a href="https://store-epicgames.com" target='_blank' rel="noreferrer" className="epicLogo cursor-pointer"> </a>
            <input type="email" name="email" id="email" placeholder="E-mail" value={ email } onChange={ (event) => setEmail(event.target.value) }/>
            <input type="password" name="password" id="password" placeholder="Senha" value={ password } onChange={ (event) => setPassword(event.target.value) }/>
            <small id="messageValidation" className="error" >Senha ou Email estão incorretos!</small>
            <small id="messageMinLength" className="error">Preencha e-mail e senha com pelo menos 3 caracteres!</small>
            <button id="login-button" className="flex align-center justify-center" onClick={login()}>
                <div id="loader-login">
                    <div className="loader"></div>
                </div>
                Entrar
            </button>
          </div>
        </div>

          <div id="home" className={ `flex-column ${ isLogged ? 'show' : '' }` }>
              <nav className="navigation">
                  <div>
                      <a className="epicLogo cursor-pointer" href="https://store-epicgames.com" target='_blank' rel="noreferrer"> </a>
                      <span>
                          STORE
                          <div className="active"></div>
                      </span>
                      <span>
                          PERGUNTAS FREQUENTES
                          <div className="inactive"></div>
                      </span>
                      <span>
                          AJUDA
                          <div className="inactive"></div>
                      </span>
                      <span>
                          UNREAL ENGINE
                          <div className="inactive"></div>
                      </span>
                  </div>
      
                  <div>
                      <span>
                          <img src="assets/icons/globe-grid-svgrepo-com.svg" width="17" height="17" alt="globe_icon" />
                      </span>
                      <span>
                          <div className="flex">
                              <img src="assets/icons/user-svgrepo-com.svg" width="17" height="17" alt="user_icon" />
                              <span id="userEnt">{ email || 'ENTRAR' }</span> 
                          </div>
                          <div className="inactive"></div>
                      </span>
                      <button className="download">
                          <div>BAIXAR EPIC GAMES</div>
                          <div className="burger-menu"></div>
                      </button>
                  </div>            
              </nav>
                <div className="main">
                    <div className="fixed-header">
                        <div className="icon-search" id="div-search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" preserveAspectRatio="xMidYMid meet" id="svg-search">
                                <g transform="scale(1 -1) rotate(-45 -11.93502884 -2)" stroke="currentColor" strokeWidth="1.65" fill="none" fillRule="evenodd">
                                    <circle cx="7.70710678" cy="7.70710678" r="7"></circle>
                                    <path d="M15.2071068 8.62132034h5.6923881" strokeLinecap="square"></path>
                                </g>
                            </svg>
      
                          <input type="text" placeholder="Pesquisar loja" id="input-search" autoComplete="off" />
                          <div id="input-background"></div>
                            <div id="data-rows">
                                <div id="loader-background">
                                    <div className="loader"></div>
                                </div>
                                <div id="data-rows-content"></div>
                            </div>
                      </div>
                        <div className="add-new-game flex centralize">
                            <a className="active" href="https://store-epicgames.com" target='_blank' rel="noreferrer">Adicionar Jogo</a>
                            <span className="down-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 9">
                                    <path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fillRule="evenodd"></path>
                                </svg>
                            </span>
                        </div>
                        <div className={`add-new-user ${ isAdmin ? 'show' : '' }`}>
                            <a className="active" href="https://store-epicgames.com" target='_blank' rel="noreferrer">Adicionar usuário</a>
                        </div>
                  </div>
      
                  <div className="flex carousel-images">
                        <div className="left cursor-pointer">
                            <picture>
                                <img alt="Play Saints Row on Epic Games Store" id="active-carousel-img" />
                            </picture>
                            <div className="current-carousel-button flex">
                                <h3>O tempo está acabando. Economize até 75% em jogos e complementos durante a Promoção do Evento de Agosto. Acaba em 6 de setembro.</h3>
                                <button>ECONOMIZE AGORA</button>
                            </div>
                            <div className="current-carousel-info"></div>
                        </div>
                      <div className="right" id="carousel-games">{ popularGamesContainers }</div>
                  </div>
                  <div className="flex centralize" id="balls">{ carouselBalls }</div>
                  <div className="flex align-center justify-between">
                      <h2 className="flex highlight">
                            <a href="https://store-epicgames.com" target='_blank' rel="noreferrer">
                                Destaques: Promoção do Evento de Agosto
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 5 9">
                                            <path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fillRule="evenodd"></path>
                                        </svg>
                                    </span>
                            </a>
                      </h2>
                        <div className="flex">
                            <button className="arrow-button-rotate">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 9">
                                    <path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fillRule="evenodd"></path>
                                </svg>
                            </button>
                            <button className="arrow-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 9">
                                    <path stroke="currentColor" d="M1 1l3 3.5L1 8" fill="none" fillRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                  </div>
        
                    <div className="highlight-images-main flex w-100" id="highlight-images">
                        { gameContainers }
                    </div>
              </div>
          </div>
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
    </div>
  );
}
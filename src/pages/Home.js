import { useEffect, useState } from 'react';
import { games, popularGames } from "../js/games-data";

export default function Home() {
    const [ email, setEmail] = useState('');
    const gamesData = games() || [];
    const popularGamesData = popularGames() || [];
    const isAdmin = localStorage.getItem('admin');
    
    useEffect(() => {
        carouselInit();
    });

    const carouselBalls = popularGamesData.map((game, index) => (
        <div
            className={ "balls " + (index === 0 ? "active" : "") }
            key={ index }
        ></div>
    ));
  
    const popularGamesContainers = popularGamesData.map((game, index) => (
        <div
            className={ "carousel-games " + (index === 0 ? "active" : "") }
            key={ index }
        >
            <img src={ game.url } alt={ game.title } />
            <h3>{ game.description }</h3>
            <div className="games-info">{ game.title }</div>
        </div>
    ));

    const gameContainers = gamesData.map((game, index) => (
        <div className="highlight-images w-100" key={ index }>
            <img alt={ game.title } src={ game.url } />
            <div className="base-game">JOGO BASE</div>
            <div className="game-name">{ game.title }</div>
            <div className="flex">
                <div className={ game.discount ? "discount" : "none" }>{ game.discount }</div>
                <div className="price">
                    <span className={ game.discount ? "old-price" : "none" }>
                    R$ { game.old_price }
                    </span>
                    <span className="current-price">R$ { game.current_price }</span>
                </div>
            </div>
        </div>
    ));

    let img;
    function carouselInit() {
        const popularGamesContainer = document.getElementById("carousel-games");
        const ballsContainer = document.getElementById("balls");
        let childrenBalls = Array.from(ballsContainer.children);
        let childrenPopularGames = Array.from(popularGamesContainer.children);
        let index = 0;
        const activeDiv = document.createElement("div");
        // activeDiv.setAttribute('key', Math.random());
        activeDiv.classList.add("carousel-progress");
        console.log(childrenPopularGames, childrenBalls)
        childrenPopularGames[index].appendChild(activeDiv);
        childrenBalls[index].classList.add('active');
        childrenPopularGames[index].classList.add('active');
        defineCarouselImg(childrenPopularGames[index]);

        setInterval(() => {
            childrenBalls[index].classList.remove('active');
            childrenPopularGames[index].classList.remove('active');
            index++;
            if (index === popularGamesData.length) { 
                index = 0;
                popularGamesContainer.scrollLeft = 1;
            }
            childrenBalls[index].classList.add('active');
            childrenPopularGames[index].classList.add('active');
            activeDiv.setAttribute('key', Math.random());
            childrenPopularGames[index].appendChild(activeDiv);
            defineCarouselImg(childrenPopularGames[index]);
            popularGamesContainer.scrollLeft += (img.offsetWidth + 30);
            
        }, 8000);
    }

    function defineCarouselImg(element) {
      const activeCarouselImg = document.getElementById('active-carousel-img');

        element.childNodes.forEach(item => { 
            if (item.constructor.name === 'HTMLImageElement') {
                activeCarouselImg.classList.toggle("active");
                activeCarouselImg.src = item.src;
                img = item;
            }
        });
    }

    return (
        <>
        <div id="home" className={ `flex-column show` }>
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
                        <img src="../assets/icons/globe-grid-svgrepo-com.svg" width="17" height="17" alt="globe_icon" />
                    </span>
                    <span>
                        <div className="flex">
                            <img src="" width="17" height="17" alt="user_icon" />
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
        </>
    );
}
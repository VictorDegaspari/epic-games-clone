import { useState } from 'react';
import './App.css';
import './styles.css';

export default function App() {
  useState(() => {

  });

  return (
    <div className="App">
        <div id="login" className="flex flex-column ">
          <div className="content flex flex-column">
            <a href="https://store-epicgames.com" target='_blank' rel="noreferrer" className="epicLogo cursor-pointer"> </a>
            <input type="email" name="email" id="email" placeholder="E-mail" />
            <input type="password" name="password" id="password" placeholder="Senha" />
            <small id="messageValidation" className="error" >Senha ou Email estão incorretos!</small>
            <small id="messageMinLength" className="error">Preencha e-mail e senha com pelo menos 3 caracteres!</small>
            <button id="login-button" className="flex align-center justify-center">
                <div id="loader-login">
                    <div className="loader"></div>
                </div>
                Entrar
            </button>
          </div>
        </div>

          <div id="home" className="flex-column">
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
                              <span id="userEnt">ENTRAR</span> 
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
                      <div className="add-new-user">
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
                      <div className="right" id="carousel-games"></div>
                  </div>
                  <div className="flex centralize" id="balls"></div>
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
                      <div className="highlight-images w-100"></div>
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
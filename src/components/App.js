import React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import ESC_KEYCODE from '../utils/keycode'
import api from "../utils/api";
import {UserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';


function App() {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatar: ''
    });
    //попапы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);


    //авторизация
    const [loggedIn, setLoggedIn] = useState(false);
    const[email, setEmail] = useState('');
    const history = useHistory();

    const [selectedCard, setSelectedCard] = useState(false);
    const [cards, setCards] = useState([]);
    //получаем информацию о карточках и пользователе
    useEffect(() => {
        if(loggedIn) {
            api.getAllData()
                .then((response => {
                    const [userData, cardsData] = response;
                    setCards(cardsData);
                    setCurrentUser(userData);
                }))
                .catch((err) => {
                    console.log(err);
                })
        }

    }, [loggedIn])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            auth.getContent(token)
                .then(data => {
                    if(data){
                        setEmail(data.data.email);
                        handleLoggedIn();
                        history.push('/');
                    }
                })
        }
    }, [history]);


    //обработчик регистрации пользователя
    function handleRegister(password, email){
        auth.register(password, email)
            .then(data => {
                if(data){
                    // handleInfoTooltip(true);
                    history.push('/sign-in');
                }
            })
            .catch(err => {
                console.log(err);
                // handleInfoTooltip(false);
            })
    }

    //обработчик авторизации пользователя
    function handleLogin (password, email) {
        auth.authorize(password, email)
            .then(data => {
                if(data.token){
                    setEmail(email);
                    handleLoggedIn();
                    localStorage.setItem('token', data.token);
                    history.push('/');
                }
            })
            .catch(err => {
                // handleInfoTooltip(false);
                console.log(err);
            })
    }

    //обработчик выхода пользователя
    function handleSignOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setEmail('');
        history.push('/sign-in');
    }

    function handleLoggedIn() {
        setLoggedIn(!loggedIn);
    }
    //функционал для открытия и закрытия попапов

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
        console.log(currentUser)
    }


    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(false);
    }

    function onKeyPressed(e) {
        if (e.keyCode === ESC_KEYCODE) {
            closeAllPopups();
        }
    }

    //отрисовка лайков и запрос в api
    function handleCardLike(item) {
        const isLiked = item.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(item._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === item._id ? newCard : c);
            setCards(newCards);
        })
            .catch((err) => {
                console.log(err);
            });

    }

    //обновление информации о пользователе
    function handleUpdateUser(data) {
        api.saveEditedInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //удаление карточки
    function handleCardDelete(item) {

        api.deleteCard(item._id).then(() => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.filter((c) => c._id !== item._id);
            // Обновляем стейт
            setCards(newCards);
        })
            .catch((err) => {
                console.log(err);
            });
    }
    //обновление аватара
    function handleUpdateAvatar(userData) {
        api.updateAvatar(userData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // добавление новой карточки
    function handleAddPlaceSubmit(formData) {
        api.addNewCard(formData)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //обращение к апи

    return (
        <UserContext.Provider value={currentUser}>
            <div className="body" onKeyDown={onKeyPressed} tabIndex="0">
                <div className="page">
                    <Header email={email} onSignOut={handleSignOut} />
                    <Switch>
                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                                            cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />

                        </Route>
                        <Route path="/sign-up">
                            <Register handleRegister={handleRegister} />
                        </Route>
                        <Route path="/sign-in">
                            <Login handleLogin={handleLogin} />
                        </Route>
                    </Switch>
                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit}/>
                    <ImagePopup id='popupImage' card={selectedCard} onClose={closeAllPopups}>
                    </ImagePopup>
                </div>
            </div>
        </UserContext.Provider>

    );
}

export default App;

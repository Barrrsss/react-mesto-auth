import React from 'react'
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
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
import InfoTooltip from './InfoTooltip';
import sucess from '../images/sucess.svg';
import fail from '../images/fail.svg';
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
    const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = useState(false);
    const [isFailTooltipOpen, setIsFailTooltipOpen] = useState(false);

    //авторизация
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const history = useHistory();
    //карточки
    const [selectedCard, setSelectedCard] = useState(false);
    const [cards, setCards] = useState([]);

    //получаем информацию о карточках и пользователе
    useEffect(() => {
        if (loggedIn) {
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
    //аутентификация и токен
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            auth.getContent(token)
                .then(data => {
                    if (data) {
                        setEmail(data.data.email);
                        handleLoggedIn();
                        history.push('/');
                    }
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    //закрытие попапа по оверлею
    function handleOverlayClose(evt) {
        if (evt.target.classList.contains("popup")) {
            closeAllPopups();
        }
    }

    //обработчик регистрации пользователя
    function handleRegister(password, email) {
        auth.register(password, email)
            .then(data => {
                if (data) {
                    setIsSuccessTooltipOpen(true);
                    setTimeout(() =>
                        setIsSuccessTooltipOpen(false), 2000);
                    history.push('/sign-in');
                }
            })
            .catch(err => {
                console.log(err);
                setIsFailTooltipOpen(true)
                setTimeout(() =>
                    setIsFailTooltipOpen(false), 2000);
            })
    }

    function handleLoggedIn() {
        setLoggedIn(!loggedIn);
    }

    //обработчик авторизации пользователя
    function handleLogin(password, email) {
        auth.authorize(password, email)
            .then(data => {
                if (data.token) {
                    setEmail(email);
                    handleLoggedIn();
                    localStorage.setItem('token', data.token);
                    history.push('/');
                }
            })
            .catch(err => {
                setIsFailTooltipOpen(true)
                setTimeout(() =>
                    setIsFailTooltipOpen(false), 2000);
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
        setIsSuccessTooltipOpen(false);
        setIsFailTooltipOpen(false);
    }

    //закрытие по esc
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
                    <Header email={email} onSignOut={handleSignOut}/>
                    <Switch>
                        <Route exact path="/">
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                                            onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
                                            onCardClick={handleCardClick}
                                            cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>

                        </Route>
                        <Route path="/sign-up">
                            <Register handleRegister={handleRegister}/>
                        </Route>
                        <Route path="/sign-in">
                            <Login handleLogin={handleLogin}/>
                        </Route>
                    </Switch>
                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser} onPopupOverlayClose={handleOverlayClose}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar} onPopupOverlayClose={handleOverlayClose}/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit} onPopupOverlayClose={handleOverlayClose}/>
                    <ImagePopup id='popupImage' card={selectedCard} onClose={closeAllPopups}
                                onPopupOverlayClose={handleOverlayClose}/>

                    <InfoTooltip title="Вы успешно зарегистрировались!" src={sucess} isOpen={isSuccessTooltipOpen}
                                 onClose={closeAllPopups} onPopupOverlayClose={handleOverlayClose}/>
                    <InfoTooltip title="Что-то пошло не так! Попробуйте ещё раз." src={fail} isOpen={isFailTooltipOpen}
                                 onClose={closeAllPopups} onPopupOverlayClose={handleOverlayClose}/>
                </div>
            </div>
        </UserContext.Provider>

    );
}

export default App;

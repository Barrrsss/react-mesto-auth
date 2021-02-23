import React, {useContext}from "react";
import {UserContext} from "../contexts/CurrentUserContext";

function Card({item, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(UserContext);
    function handleClick() {
        onCardClick(item);
    }
    function handleLikeClick() {
        onCardLike(item);
    }
    function handleLikeDelete() {
        onCardDelete(item);
    }
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = item.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__button-trash ${isOwn ? 'element__button-trash_visible' : ''}`
    );
    const isLiked = item.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName  = (
        `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
    );
    return (
        <li className="element">
            <img className="element__image" src={item.link} onClick={handleClick} alt="#" />
            <button className={cardDeleteButtonClassName} onClick={handleLikeDelete} type="button" />
            <div className="element__name-place">
                <h2 className="element__name-title">{item.name}</h2>
                <div className="element__like">
                    <button id="likeButton" className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
                    <p className="element__like-counter">{item.likes.length}</p>
                </div>


            </div>
        </li>
    );
}
export default Card
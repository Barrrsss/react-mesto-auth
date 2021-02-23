import React, {useContext} from "react";
import pencil from "../images/update-avatar.svg";
import Card from "./Card";
import {UserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = useContext(UserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__image" style={{backgroundImage: `url(${currentUser.avatar})`}}
                         onClick={props.onEditAvatar}>
                    </div>
                    <img className="profile__image-hover" src={pencil} alt="Карандаш"/>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit" type="button" onClick={props.onEditProfile} />
                        <h2 className="profile__title">{currentUser.about}</h2>
                    </div>
                </div>
                <button className="profile__add" type="button" onClick={props.onAddPlace} />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((item) => <Card key={item._id} item={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
                </ul>
            </section>
        </main>
    );
}

export default Main


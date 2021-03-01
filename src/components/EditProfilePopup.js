import React, {useContext} from 'react'
import {useState, useEffect} from 'react'
import PopupWithForm from "./PopupWithForm";
import {UserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup (props) {
    const currentUser = useContext(UserContext);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    function nameChange(e) {
        setName(e.target.value);
    }
    function titleChange(e) {
        setTitle(e.target.value);
    }



    useEffect(() => {
        setName(currentUser.name);
        setTitle(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser ({
            name,
            about: title,
        });
    }
    return (
        <PopupWithForm id='popupEdit' title='Редактировать профиль' name='edit-profile' button = 'Сохранить'
                       isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} onPopupOverlayClose={props.onPopupOverlayClose}>
            <input id="nameField" className="popup__field popup__field_name" type="text" name="name"
                   placeholder="Имя" value={name} onChange={nameChange}
                   minLength="2" maxLength="40" required/>
            <span id='nameField-error'></span>
            <input id="titleField" className="popup__field popup__field_title" type="text" name="about"
                   placeholder="О себе" value={title} onChange={titleChange}
                   minLength="2" maxLength="200" required/>
            <span id='titleField-error'></span>
        </PopupWithForm>

    );
}


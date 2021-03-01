import React from 'react'
import {useRef} from 'react'
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup (props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        avatarRef.current.value = '';
    }
    return (
        <PopupWithForm id='popupAvatar' title='Обновить аватар' name='update-avatar'
                       isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} button = 'Сохранить'
                       onPopupOverlayClose={props.onPopupOverlayClose} >
            <input id="updateField" className="popup__field popup__field_update" type="url" name="link"
                   placeholder="Ссылка на картинку" required ref={avatarRef} />
            <span id='updateField-error'></span>
        </PopupWithForm>
    );
}
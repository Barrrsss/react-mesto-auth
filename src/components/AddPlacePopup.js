import React, {useEffect} from 'react'
import {useRef} from 'react'
import PopupWithForm from "./PopupWithForm";


export default function AddPlacePopup (props) {
    const aboutRef = useRef();
    const nameRef = useRef();

    useEffect(() => {
        nameRef.current.value = '';
        aboutRef.current.value = '';
    }, [props.isOpen]);
    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: aboutRef.current.value
        });
        nameRef.current.value = '';
        aboutRef.current.value = '';
    }
    return (
        <PopupWithForm id="popupAdd" title='Новое место' name='add-card' isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} button = 'Сохранить' onPopupOverlayClose={props.onPopupOverlayClose}>
            <input id="placeField" className="popup__field popup__field_add-card popup__field_place" type="text"
                   name="name" ref={nameRef}
                   placeholder="Название" minLength="2" maxLength="30" required/>
            <span id='placeField-error'></span>
            <input id="sourceField" className="popup__field popup__field_add-card popup__field_source"
                   type="url" ref={aboutRef}
                   name="link"
                   placeholder="Ссылка на картинку" required/>
            <span id='sourceField-error'></span>
        </PopupWithForm>
    );
}
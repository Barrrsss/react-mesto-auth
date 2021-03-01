function PopupWithForm(props) {
    return (
        <div className={props.isOpen ? `popup popup_${props.name} popup_opened` : `popup popup_${props.name}`}
             onClick={props.onPopupOverlayClose}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose}/>
                <div className="popup__area">
                    <h2 className="popup__title">{`${props.title}`}</h2>

                    <form className={`popup__fields popup__fields_${props.name}`} onSubmit={props.onSubmit}
                          name="popups" noValidate>
                        {props.children}
                        <button className="popup__button popup__button_edit-profile popup__button_active"
                                type="submit"
                                value="Сохранить">{props.button}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm


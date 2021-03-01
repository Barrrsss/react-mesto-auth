function ImagePopup(props) {

    return (
        <div className={props.card ? `popup popup_image popup_opened` : `popup popup_image`}
             onClick={props.onPopupOverlayClose}>
            <div className="popup__container">
                <button className="popup__close popup__close_image" type="button" onClick={props.onClose}/>
                <img className="popup__image-full" src={props.card.link} alt="Фотография"/>
                <p className="popup__image-sign">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup
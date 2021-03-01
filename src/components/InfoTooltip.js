import React from 'react';

function InfoTooltip(props) {

    return (
        <section className={props.isOpen ? 'popup popup_opened' : 'popup'} onClick={props.onPopupOverlayClose}>
            <div className="popup__container">
                <div className="popup__area popup__area_tooltip">
                    <img className="popup__tooltip-icon" src={props.src} alt="иконка результата"/>
                    <h2 className={`popup__tooltip-text`}>{props.title}</h2>
                    <button className="popup__close" type="button" onClick={props.onClose}/>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip;
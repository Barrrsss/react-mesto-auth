import React from 'react';
import sucess from '../images/sucess.svg';
import fail from '../images/fail.svg';

function InfoTooltip(props) {

    return (
        <section className={props.isOpen ? 'popup popup_opened' : 'popup'} onClick={props.onPopupOverlayClose}>
            <div className="popup__container">
                <div className="popup__area popup__area_tooltip">
                    <img className="popup__tooltip-icon" src={props.isTooltipStatus ? sucess : fail} alt="иконка результата"/>
                    <h2 className={`popup__tooltip-text`}>{props.isTooltipStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                    <button className="popup__close" type="button" onClick={props.onClose}/>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip;
import mestoLogo from "../images/header-logo.svg";
import React from 'react';
import {Link, Route} from 'react-router-dom';

function Header({email, onSignOut}) {
    return (
        <header className="header">
            <img className="header__logo" src={mestoLogo} alt="Логотип место"/>
            <div className="header__auth">
                <Route path="/sign-in">
                    <Link to='sign-up' className='header__auth_link'>Регистрация</Link>
                </Route>
                <Route path="/sign-up">
                    <Link to='sign-in' className='header__auth_link'>Войти</Link>
                </Route>
                <Route exact path="/">
                    <div className='header__menu'>
                        <p className='header__email'>{email}</p>
                        <button className='header__button' onClick={onSignOut}>Выйти</button>
                    </div>

                </Route>
            </div>
        </header>
    );
}

export default Header
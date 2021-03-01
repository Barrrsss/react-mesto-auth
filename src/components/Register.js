import React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom';

export default function Register({handleRegister}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(password, email);
    }

    function handleNewEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleNewPassword(evt) {
        setPassword(evt.target.value);
    }


    return(

        <form className="auth" method="POST" name="register" onSubmit={handleSubmit} noValidate>
            <h2 className="auth__head">Регистрация</h2>
            <input className="auth__input" type="email" name="email" placeholder="E-mail"  value={email} onChange={handleNewEmail} />
            <input className="auth__input" type="password" name='password' placeholder="Пароль"  value={password} onChange={handleNewPassword} />
            <button className="auth__button" type="submit">Зарегистрироваться</button>

            <p className="auth__question">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
        </form>
    )
}
import React, {useState} from 'react';


export default function Login({handleLogin}) {

    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password){
            return;
        }
        handleLogin(password, email);
    }

    function handleEmail(evt) {
        setEmail(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    return (
        <form className="auth" method="POST" name="login" onSubmit={handleSubmit} noValidate>
            <h2 className="auth__head">Вход</h2>
            <input className="auth__input" type="email" name="email" placeholder="E-mail" value={email} onChange={handleEmail} />
            <input className="auth__input" type="password" name='password' placeholder="Пароль" value={password} onChange={handlePassword} />
            <button className="auth__button" type="submit">Войти</button>
        </form>
    )
}
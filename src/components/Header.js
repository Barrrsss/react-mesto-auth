import mestoLogo from "../images/header-logo.svg";

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={mestoLogo} alt="Логотип место"/>
            <div className="header__auth">
                {<p className="header__email">userEmail</p>}
                {/*{props.loggedIn && <Link className="header__logout" to="/sign-in" onClick={props.handleLogout}>Выйти</Link>}*/}
                {/*{!props.loggedIn && <Link className="header__sign" to="/sign-up">Регистрация</Link>}*/}
            </div>
        </header>
    );
}

export default Header
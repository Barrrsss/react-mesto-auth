import mestoLogo from "../images/header-logo.svg";

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={mestoLogo} alt="Логотип место"/>
        </header>
    );
}

export default Header
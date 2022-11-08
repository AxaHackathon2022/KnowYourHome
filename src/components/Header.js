import classes from './Header.module.css';
import logo from "./Logo_def.png";

function Header() {
    return (
        <header className={`${classes.header}`}>
            <img src={logo} className="logo" alt="logo" height= "150" width="250" />
        </header>
    );
}

export default Header;
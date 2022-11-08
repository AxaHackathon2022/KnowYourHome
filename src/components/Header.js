import classes from './Header.module.css';

function Header() {
    return (
        <header className={`${classes.header}`}>
            <img src="./Logo_def.png" alt = "Logo"/> 
        </header>
    );
}

export default Header;
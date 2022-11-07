import classes from './Header.module.css';

function Header() {
    return (
        <header className={`${classes.header}`}>
            <h1>KnowYourHome</h1>
        </header>
    );
}

export default Header;
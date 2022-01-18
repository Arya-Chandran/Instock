import { Link } from "react-router-dom";
import logoSrc from "../../assets/logos/InStock-Logo.svg";
import "./Header.scss";

function Header({ pageUrl }) {
    const warehouseLink = () => {
        if (pageUrl().includes("http://localhost:3000/warehouse")) {
            return "primary-nav__item1";
        } else {
            return "primary-nav__item2";
        }
    };

    const inventoryLink = () => {
        if (pageUrl().includes("http://localhost:3000/inventory")) {
            return "primary-nav__item1";
        } else {
            return "primary-nav__item2";
        }
    };

    return (
        <header className="header">
            <div className="header__wrapper">
                <Link to="/warehouse">
                    <img
                        className="header__logo"
                        src={logoSrc}
                        alt="Instock logo"
                    />
                </Link>
                <nav className="primary-nav">
                    <ul className="primary-nav__list">
                        <div className="primary-nav__item1-wrapper">
                            <Link to="/warehouse">
                                <button
                                    className={`${warehouseLink()}`}
                                    type="submit"
                                >
                                    Warehouses
                                </button>
                            </Link>
                        </div>
                        <Link to="/inventory">
                            <button
                                className={`${inventoryLink()}`}
                                type="submit"
                            >
                                Inventory
                            </button>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

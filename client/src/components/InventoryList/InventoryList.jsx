import { Component } from "react";
import { Link, Route } from "react-router-dom";
import Button from "../Buttons/Buttons";
import DeleteInventory from "../Delete/DeleteInventory";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import "./InventoryList.scss";

class InventoryList extends Component {
    componentDidMount() {
        this.props.getInventoryItems();
    }

    /* determine the styling used for in stock/out of stock labels */

    stockStatus = (status) => {
        if (status === "In Stock") {
            return "inventory-list__details--in-stock";
        } else if (status === "Out of Stock") {
            return "inventory-list__details--out-of-stock";
        }
    };

    render() {
        const { inventoryItems, deleteInventoryItem } = this.props;

        return (
            <main className="inventory-list">
                <div className="inventory-list__container">
                    <section className="inventory-list__header">
                        <h1 className="inventory-list__page-heading">
                            Inventory
                        </h1>
                        <div className="inventory-list__search-bar-container">
                            <form className="inventory-list__search-bar">
                                <input
                                    className="inventory-list__search-bar-input"
                                    id="search"
                                    name="search"
                                    placeholder="Search..."
                                />
                                <button
                                    className="inventory-list__search-bar-button"
                                    type="submit"
                                    onClick={(event) => {
                                        event.preventDefault();
                                    }}
                                >
                                    <img
                                        className="inventory-list__search-bar-icon"
                                        src={searchIcon}
                                        alt="Magnifying glass icon."
                                    />
                                </button>
                            </form>
                            <Link
                                className="inventory-list__add-item"
                                to="/inventory/add-item"
                            >
                                <Button
                                    category="primary"
                                    type="button"
                                    text="+ Add New Item"
                                />
                            </Link>
                        </div>
                    </section>
                    <ul className="inventory-list__columns">
                        <li className="inventory-list__column inventory-list__column--item">
                            Inventory Item
                            <img
                                className="inventory-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="inventory-list__column inventory-list__column--category">
                            Category
                            <img
                                className="inventory-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="inventory-list__column inventory-list__column--status">
                            Status
                            <img
                                className="inventory-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="inventory-list__column inventory-list__column--qty">
                            QTY
                            <img
                                className="inventory-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="inventory-list__column inventory-list__column--warehouse">
                            Warehouse
                            <img
                                className="inventory-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="inventory-list__column inventory-list__column--actions">
                            Actions
                        </li>
                    </ul>
                    <ul className="inventory-list__table">
                        {inventoryItems.map((item) => {
                            return (
                                <li
                                    className="inventory-list__item"
                                    key={item.id}
                                >
                                    <div className="inventory-list__details-container inventory-list__details-container--item">
                                        <h2 className="inventory-list__details-heading">
                                            Inventory Item
                                        </h2>
                                        <div className="inventory-list__link-container">
                                            <Link
                                                className="inventory-list__link"
                                                to={`/inventory/${item.id}`}
                                            >
                                                {item.itemName}
                                            </Link>
                                            <img
                                                className="inventory-list__link-icon"
                                                src={chevronIcon}
                                                alt="Right chevron icon."
                                            />
                                        </div>
                                    </div>
                                    <div className="inventory-list__details-container inventory-list__details-container--status">
                                        <h2 className="inventory-list__details-heading">
                                            Status
                                        </h2>
                                        <p
                                            className={`inventory-list__details ${this.stockStatus(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </p>
                                    </div>
                                    <div className="inventory-list__details-container inventory-list__details-container--category">
                                        <h2 className="inventory-list__details-heading">
                                            Category
                                        </h2>
                                        <p className="inventory-list__details">
                                            {item.category}
                                        </p>
                                    </div>
                                    <div className="inventory-list__details-wrapper">
                                        <div className="inventory-list__details-container inventory-list__details-container--qty">
                                            <h2 className="inventory-list__details-heading">
                                                QTY
                                            </h2>
                                            <p className="inventory-list__details">
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div className="inventory-list__details-container inventory-list__details-container--warehouse">
                                            <h2 className="inventory-list__details-heading">
                                                Warehouse
                                            </h2>
                                            <p className="inventory-list__details">
                                                {item.warehouseName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="inventory-list__details-container inventory-list__details-container--actions">
                                        <Route
                                            path="/inventory"
                                            render={(routerProps) => (
                                                <DeleteInventory
                                                    id={item.id}
                                                    item={item.itemName}
                                                    deleteInventoryItem={deleteInventoryItem}
                                                    {...routerProps}
                                                />
                                            )}
                                        />
                                        <Link
                                            className="inventory-list__edit-item"
                                            to={`/inventory/${item.id}/edit-item`}
                                        >
                                            <img
                                                className="inventory-list__action-icon"
                                                src={editIcon}
                                                alt="Pencil icon."
                                            />
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </main>
        );
    }
}

export default InventoryList;

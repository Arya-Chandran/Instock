import { Component } from "react";
import { Route, Link } from "react-router-dom";
import Button from "../Buttons/Buttons";
import DeleteWarehouse from "../Delete/DeleteWarehouse";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import chevronIcon from "../../assets/icons/chevron_right-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import "./WarehouseList.scss";

class WarehouseList extends Component {
    componentDidMount() {
        this.props.getWarehouses();
    }

    render() {
        const { warehouses, deleteWarehouse } = this.props;

        return (
            <main className="warehouse-list">
                <div className="warehouse-list__container">
                    <section className="warehouse-list__header">
                        <h1 className="warehouse-list__page-heading">
                            Warehouses
                        </h1>
                        <div className="warehouse-list__search-bar-container">
                            <form className="warehouse-list__search-bar">
                                <input
                                    className="warehouse-list__search-bar-input"
                                    id="search"
                                    name="search"
                                    placeholder="Search..."
                                />
                                <button
                                    className="warehouse-list__search-bar-button"
                                    type="submit"
                                    onClick={(event) => {
                                        event.preventDefault();
                                    }}
                                >
                                    <img
                                        className="warehouse-list__search-bar-icon"
                                        src={searchIcon}
                                        alt="Magnifying glass icon."
                                    />
                                </button>
                            </form>
                            <Link
                                className="warehouse-list__add-warehouse"
                                to="/warehouse/add-warehouse"
                            >
                                <Button
                                    category="primary"
                                    type="button"
                                    text="+ Add New Warehouse"
                                />
                            </Link>
                        </div>
                    </section>
                    <ul className="warehouse-list__columns">
                        <li className="warehouse-list__column warehouse-list__column--location">
                            Warehouse
                            <img
                                className="warehouse-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="warehouse-list__column warehouse-list__column--address">
                            Address
                            <img
                                className="warehouse-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="warehouse-list__column warehouse-list__column--name">
                            Contact Name
                            <img
                                className="warehouse-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="warehouse-list__column warehouse-list__column--contact">
                            Contact Information
                            <img
                                className="warehouse-list__column-icon"
                                src={sortIcon}
                                alt="Caret up and caret down icon."
                            />
                        </li>
                        <li className="warehouse-list__column warehouse-list__column--actions">
                            Actions
                        </li>
                    </ul>
                    <ul className="warehouse-list__table">
                        {warehouses.map((warehouse) => {
                            return (
                                <li
                                    className="warehouse-list__item"
                                    key={warehouse.id}
                                >
                                    <div className="warehouse-list__details-container warehouse-list__details-container--location">
                                        <h2 className="warehouse-list__details-heading">
                                            Warehouse
                                        </h2>
                                        <div className="warehouse-list__link-container">
                                            <Link
                                                className="warehouse-list__link"
                                                to={`/warehouse/${warehouse.id}`}
                                            >
                                                {warehouse.name}
                                            </Link>
                                            <img
                                                className="warehouse-list__link-icon"
                                                src={chevronIcon}
                                                alt="Right chevron icon."
                                            />
                                        </div>
                                    </div>
                                    <div className="warehouse-list__details-container warehouse-list__details-container--name">
                                        <h2 className="warehouse-list__details-heading">
                                            Contact Name
                                        </h2>
                                        <p className="warehouse-list__details">
                                            {warehouse.contact.name}
                                        </p>
                                    </div>
                                    <div className="warehouse-list__details-container warehouse-list__details-container--address">
                                        <h2 className="warehouse-list__details-heading">
                                            Address
                                        </h2>
                                        <p className="warehouse-list__details">
                                            {warehouse.address},{" "}
                                            {warehouse.city},{" "}
                                            {warehouse.country}
                                        </p>
                                    </div>
                                    <div className="warehouse-list__details-container warehouse-list__details-container--contact">
                                        <h2 className="warehouse-list__details-heading">
                                            Contact Information
                                        </h2>
                                        <p className="warehouse-list__details">
                                            {warehouse.contact.phone}
                                        </p>
                                        <p className="warehouse-list__details">
                                            {warehouse.contact.email}
                                        </p>
                                    </div>
                                    <div className="warehouse-list__details-container warehouse-list__details-container--actions">
                                        <Route
                                            path="/warehouse"
                                            render={(routerProps) => (
                                                <DeleteWarehouse
                                                    id={warehouse.id}
                                                    place={warehouse.name}
                                                    deleteWarehouse={
                                                        deleteWarehouse
                                                    }
                                                    {...routerProps}
                                                />
                                            )}
                                        />
                                        <Link
                                            className="warehouse-list__edit-warehouse"
                                            to={`/warehouse/${warehouse.id}/edit-warehouse`}
                                        >
                                            <img
                                                className="warehouse-list__action-icon"
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

export default WarehouseList;

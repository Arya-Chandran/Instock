import "../../components/InventoryItemDetails/InventoryItemDetails.scss";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import { Link } from "react-router-dom";

import { EditButton } from "../Buttons/Buttons";

import React from "react";
import axios from "axios";

class InventoryItemDetails extends React.Component {
    state = {
        currentItem: {},
    };

    getCurrentItem = (id) => {
        axios
            .get(`http://localhost:8080/inventory/${id}`)
            .then((response) => {
                this.setState({ currentItem: response.data });
            })
            .catch((error) => console.log(error));
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getCurrentItem(id);
    }

    stockStatus = (status) => {
        if (status === "In Stock") {
            return "inventory-item-details__body inventory-item-details__body--stock-status-true";
        } else if (status === "Out of Stock") {
            return "inventory-item-details__body inventory-item-details__body--stock-status-false";
        }
    };

    goback = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    };

    render() {
        return (
            <section className="inventory-item-details">
                <article
                    key={this.state.currentItem.id}
                    className="inventory-item-details__container"
                >
                    <div className="inventory-item-details__header">
                        <div className="inventory-item-details__name-container">
                            <img
                                src={arrowBack}
                                alt="back arrow"
                                onClick={(e) => this.goback(e)}
                            />
                            <h1>{this.state.currentItem.itemName}</h1>
                        </div>
                        <Link
                            to={`/inventory/${this.state.currentItem.id}/edit-item`}
                            className="inventory-item-details__item-edit"
                        >
                            <EditButton />
                        </Link>
                    </div>
                    <div className="inventory-item-details__details-container">
                        <div className="inventory-item-details__details-left">
                            <div className="inventory-item-details__item-description">
                                <p className="inventory-item-details__heading">
                                    ITEM DESCRIPTION:
                                </p>
                                <p className="inventory-item-details__body">
                                    {this.state.currentItem.description}
                                </p>
                            </div>
                            <div className="inventory-item-details__category">
                                <p className="inventory-item-details__heading">
                                    CATEGORY:
                                </p>
                                <p className="inventory-item-details__body">
                                    {this.state.currentItem.category}
                                </p>
                            </div>
                        </div>
                        <div className="inventory-item-details__details-right">
                            <div className="inventory-item-details__status">
                                <p className="inventory-item-details__heading">
                                    STATUS:
                                </p>
                                <p
                                    className={this.stockStatus(
                                        this.state.currentItem.status
                                    )}
                                >
                                    {this.state.currentItem.status}
                                </p>
                            </div>
                            <div className="inventory-item-details__quantity">
                                <p className="inventory-item-details__heading">
                                    QUANTITY:
                                </p>
                                <p className="inventory-item-details__body">
                                    {this.state.currentItem.quantity}
                                </p>
                            </div>
                            <div className="inventory-item-details__warehouse">
                                <p className="inventory-item-details__heading">
                                    WAREHOUSE:
                                </p>
                                <p className="inventory-item-details__body">
                                    {this.state.currentItem.warehouseName}
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        );
    }
}

export default InventoryItemDetails;

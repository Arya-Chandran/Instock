import { Link } from "react-router-dom";
import backarrow from "../../assets/icons/arrow_back-24px.svg";
import plus from "../../assets/icons/add_white_24dp.svg";
import "./AddInventoryDetails.scss";

function AddInventoryDetails({ warehouses, addNewItem, history }) {
    const addInventory = (event) => {
        event.preventDefault();

        const findWarehouseID = warehouses.find((warehouse) => {
            if (warehouse.name === event.target.warehouseName.value) {
                return warehouse.id;
            }
        });

        let newItem = {
            warehouseID: findWarehouseID.id,
            warehouseName: event.target.warehouseName.value,
            itemName: event.target.itemName.value,
            description: event.target.description.value,
            category: event.target.category.value,
            status: event.target.status.value,
            quantity: event.target.quantity.value,
        };

        addNewItem(newItem);
        history.push("/inventory");
    };

    return (
        <section className="inventoryabsolute-wrapper">
            <div>
                <h2 className="inventorypage-title">
                    <Link to="/inventory">
                        <img
                            className="inventorypage-title__arrow"
                            src={backarrow}
                            alt="arrow icon"
                        />
                    </Link>
                    Add New Inventory Item
                </h2>
            </div>
            <section className="item-wrapper">
                <form className="form-wrapper2" onSubmit={addInventory}>
                    <div className="itemdetails-wrapper">
                        <section className="itemdetails-container">
                            <h4 className="itemdetails-container__title">
                                Item Details
                            </h4>
                            <label className="itemdetailsform-title">
                                Item Name
                            </label>
                            <input
                                className="itemdetailsform-input"
                                name="itemName"
                                placeholder="Item Name"
                            ></input>
                            <label className="itemdetailsform-title">
                                Description
                            </label>
                            <input
                                className="itemdetailsform-input__desc"
                                name="description"
                                placeholder="Please enter a brief item description..."
                            ></input>
                            <label
                                className="itemdetailsform-title"
                                htmlFor="type"
                            >
                                Category
                            </label>
                            <select
                                className="itemdetailsform-input"
                                name="category"
                            >
                                <option
                                    className="placeholder"
                                    disabled
                                    defaultValue
                                >
                                    Please select
                                </option>
                                <option>Electronics</option>
                                <option>Gear</option>
                                <option>Apparel</option>
                                <option>Accessories</option>
                                <option>Health</option>
                            </select>
                        </section>
                        <section className="itemavailability-container">
                            <h4 className="itemavailability-container__title">
                                Item Availability
                            </h4>
                            <p className="itemavailabilityform-title">Status</p>
                            <label className="itemavailabilityform-button__instock">
                                <input
                                    className="itemavailabilityform-button"
                                    name="status"
                                    value="In Stock"
                                    type="radio"
                                />
                                In Stock
                            </label>
                            <label className="itemavailabilityform-button__outstock">
                                <input
                                    className="itemavailabilityform-button"
                                    name="status"
                                    value="Out of Stock"
                                    type="radio"
                                />
                                Out of stock
                            </label>
                            <p className="itemavailabilityform-title">
                                Quantity
                            </p>
                            <input
                                className="itemavailabilityform-input"
                                name="quantity"
                                placeholder="0"
                            ></input>
                            <label className="itemavailabilityform-title">
                                Warehouse
                            </label>
                            <select
                                className="itemavailabilityform-input"
                                name="warehouseName"
                            >
                                <option
                                    className="placeholder"
                                    disabled
                                    defaultValue
                                >
                                    Please select
                                </option>
                                {warehouses.map((warehouse) => {
                                    return (
                                        <option key={warehouse.id}>
                                            {warehouse.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </section>
                    </div>
                    <div className="inventorybutton-container">
                        <Link to="/inventory">
                            <button className="inventorybutton-container__cancel">
                                Cancel
                            </button>
                        </Link>
                        <button className="inventorybutton-container__add">
                            <img
                                src={plus}
                                alt="plus icon"
                                className="inventorybutton-container__add__plusicon"
                            />
                            Add Item
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}

export default AddInventoryDetails;

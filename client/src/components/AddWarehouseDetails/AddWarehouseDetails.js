import { Link } from "react-router-dom";
import backarrow from "../../assets/icons/arrow_back-24px.svg";
import plus from "../../assets/icons/add_white_24dp.svg";
import "./AddWarehouseDetails.scss";

function AddWarehouseDetails({ addNewWarehouse, history }) {
    const addWarehouse = (event) => {
        event.preventDefault();
        let newWarehouse = {
            name: event.target.name.value,
            address: event.target.address.value,
            city: event.target.city.value,
            country: event.target.country.value,
            contact: {
                name: event.target.contact.value,
                position: event.target.position.value,
                phone: event.target.phone.value,
                email: event.target.email.value,
            },
        };
        addNewWarehouse(newWarehouse);
        history.push("/warehouse");
    };

    return (
        <section className="warehouseabsolute-wrapper">
            <div>
                <h2 className="warehousepage-title">
                    <Link to="/warehouse">
                        <img
                            className="warehousepage-title__arrow"
                            src={backarrow}
                            alt="arrow icon"
                        />
                    </Link>
                    Add New Warehouse
                </h2>
            </div>
            <section className="warehouse-wrapper">
                <form className="form-wrapper" onSubmit={addWarehouse}>
                    <div className="warehouse-wrapper__form">
                        <article className="warehouse-container">
                            <h4 className="warehouse-container__title">
                                Warehouse Details
                            </h4>
                            <p className="warehouseform-title">Warehouse Name</p>
                            <input
                                className="warehouseform-input"
                                name="name"
                                placeholder="Warehouse Name"
                            ></input>
                            <p className="warehouseform-title">Street Address</p>
                            <input
                                className="warehouseform-input"
                                name="address"
                                placeholder="Street Address"
                            ></input>
                            <p className="warehouseform-title">City</p>
                            <input
                                className="warehouseform-input"
                                name="city"
                                placeholder="City"
                            ></input>
                            <p className="warehouseform-title">Country</p>
                            <input
                                className="warehouseform-input"
                                name="country"
                                placeholder="Country"
                            ></input>
                        </article>
                        <article className="contact-container">
                            <h4 className="contact-container__title">
                                Contact Details
                            </h4>
                            <p className="contactform-title">Contact Name</p>
                            <input
                                className="contactform-input"
                                name="contact"
                                placeholder="Contact Name"
                            ></input>
                            <p className="contactform-title">Position</p>
                            <input
                                className="contactform-input"
                                name="position"
                                placeholder="Position"
                            ></input>
                            <p className="contactform-title">Phone Number</p>
                            <input
                                className="contactform-input"
                                name="phone"
                                placeholder="Phone Number"
                            ></input>
                            <p className="contactform-title">Email</p>
                            <input
                                className="contactform-input"
                                name="email"
                                placeholder="Email"
                            ></input>
                        </article>
                    </div>
                    <div className="warehousebutton-container">
                        <Link to="/warehouse">
                            <button className="warehousebutton-container__cancel">
                                Cancel
                            </button>
                        </Link>
                        <button className="warehousebutton-container__add">
                            <img
                            src={plus}
                            alt="plus icon"
                            className="warehousebutton-container__add__plusicon"
                            />
                            Add Warehouse
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
}

export default AddWarehouseDetails;

import { Component } from "react";
import "./InventoryEdit.scss";
import arrowbackSrc from "../../assets/icons/arrow_back-24px.svg";
import errSrc from "../../assets/icons/error-24px.svg";
import Button from "../Buttons/Buttons";
import axios from "axios";

class InventoryEdit extends Component {
  state = {
    id: "",
    itemName: "",
    description: "",
    category: "",
    status: "",
    warehouseName: "",
    warehouseID: "",
    quantity: null,
    warehouseList: [],
    categoryList: [],
    errors: {},
  };

  getInventoryById = (id) => {
    axios
      .get(`http://localhost:8080/inventory/${id}`)
      .then((response) => {
        const {
          id,
          itemName,
          description,
          category,
          status,
          warehouseName,
          warehouseID,
          quantity,
        } = response.data;

        this.setState({
          id: id,
          itemName: itemName,
          description: description,
          category: category,
          status: status,
          warehouseName: warehouseName,
          warehouseID: warehouseID,
          quantity: quantity,
        });
      })
      .catch((error) => console.log(error));
  };

  getDropdownList = (dropdownList) => {
    const property =
      dropdownList === "categoryList" ? "category" : "warehouses";
    axios
      .get(`http://localhost:8080/inventory/dropdown/${property}`)
      .then((response) => {
        this.setState({
          [dropdownList]: response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.getInventoryById(id);
    }
    this.getDropdownList("categoryList");
    this.getDropdownList("warehouseList");
  }

  handleChange = (event) => {
    const errors = this.state.errors;
    this.setState({
      [event.target.name]: event.target.value,
    });

    if (event.target.value && errors[event.target.name]) {
      delete errors[event.target.name];
      this.setState({ errors: { ...errors } });
    }
    if (
      event.target.name === "quantity" &&
      this.state.status === "In Stock" &&
      !event.target.value
    ) {
      this.setState({
        errors: {
          ...errors,
          [event.target.name]: "This field is required",
        },
      });
    } else if (!event.target.value) {
      this.setState({
        errors: {
          ...errors,
          [event.target.name]: "This field is required",
        },
      });
    }
  };

  handleDropdown = (event, property) => {
    if (property === "category") {
      this.setState({
        category: event.target.value,
      });
    } else if (property === "warehouses") {
      const selectedWarehouse = this.state.warehouseList.find(
        (warehouse) => warehouse.warehouseName === event.target.value
      );

      this.setState({
        warehouseName: event.target.value,
        warehouseID: selectedWarehouse.warehouseID,
      });
    }
  };

  goback = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  };

  validateForm = () => {
    const errors = this.state.errors;
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  };

  handleSubmit = (e) => {
    const { id } = this.props.match.params;
    const {
      itemName,
      description,
      category,
      status,
      quantity,
      warehouseName,
      warehouseID,
    } = this.state;
    e.preventDefault();
    const validFormData = this.validateForm();
    if (validFormData) {
      axios
        .put(`http://localhost:8080/inventory/${id}`, {
          itemName: itemName,
          description: description,
          category: category,
          status: status,
          quantity: status === "Out of Stock" ? 0 : quantity,
          warehouseName: warehouseName,
          warehouseID: warehouseID,
        })
        .then((response) => {
          this.props.history.goBack();
        })
        .catch((error) => {
          alert("Apologies! Experiencing technical issues.");
        });
    } else {
      alert("Please validate the form data!");
    }
  };

  render() {
    const {
      id,
      itemName,
      description,
      category,
      status,
      quantity,
      warehouseName,
      categoryList,
      warehouseList,
      warehouseID,
      errors,
    } = this.state;

    return (
      <div className="inventory">
        <div className="inventory__wrapper">
          <div className="inventory__header">
            <img src={arrowbackSrc} alt="" onClick={(e) => this.goback(e)} />

            <h1 className="inventory__title">Edit Inventory Item</h1>
          </div>
          <form className="inventory__form" action="">
            <div className="inventory__form--top-container">
              <div className="inventory__form--inventory-details">
                <h2 className="inventory__form--subtitle">Item Details</h2>
                <label className="inventory__form--label-field" htmlFor="">
                  Item Name
                </label>
                <input
                  className={
                    !errors.itemName
                      ? "inventory__form--input-name"
                      : "inventory__form--input-invalid"
                  }
                  type="text"
                  name="itemName"
                  value={itemName}
                  onChange={this.handleChange}
                  placeholder="Enter Item name"
                />
                {errors && errors.itemName && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />
                    <p className="warehouse__form--error-field">
                      {errors.itemName}
                    </p>
                  </div>
                )}
                <label className="inventory__form--label-field" htmlFor="">
                  Description
                </label>
                <textarea
                  className={`inventory__form--input-description ${
                    !errors.description
                      ? ""
                      : "inventory__form--input-invalid-des"
                  }`}
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Enter description"
                ></textarea>
                {errors && errors.description && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />
                    <p className="warehouse__form--error-field">
                      {errors.description}
                    </p>
                  </div>
                )}
                <label className="inventory__form--label-field" htmlFor="">
                  Category
                </label>
                <select
                  className="inventory__form--input-category"
                  value={this.state.category}
                  onChange={(e) => this.handleDropdown(e, "category")}
                >
                  {categoryList.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="inventory__form--contact-details">
                <h2 className="inventory__form--subtitle">Item Availability</h2>
                <label className="inventory__form--label-field" htmlFor="">
                  Status
                </label>
                <div className="inventory__form--input-field">
                  <div>
                    <input
                      className="inventory__form--input-status"
                      type="radio"
                      checked={status == "In Stock"}
                      onChange={() =>
                        this.setState({
                          status: "In Stock",
                        })
                      }
                    />
                    <span className="inventory__form--input-status1">
                      In stock
                    </span>
                  </div>
                  <div>
                    <input
                      className="inventory__form--input-status"
                      type="radio"
                      checked={status == "Out of Stock"}
                      onChange={() =>
                        this.setState({
                          status: "Out of Stock",
                        })
                      }
                    />
                    <span className="inventory__form--input-status2">
                      Out of stock
                    </span>
                  </div>
                </div>
                {status === "In Stock" && (
                  <div>
                    <label className="inventory__form--label-field" htmlFor="">
                      Quantity
                    </label>
                    <input
                      className={`inventory__form--input-name ${
                        !errors.quantity ? "" : "inventory__form--input-invalid"
                      }`}
                      type="text"
                      name="quantity"
                      value={quantity}
                      onChange={this.handleChange}
                      placeholder="Enter quantity"
                    />
                    {errors && errors.quantity && (
                      <div className="warehouse__form--error-state">
                        <img
                          className="warehouse__form--error-image"
                          src={errSrc}
                          alt="Error image"
                        />
                        <p className="warehouse__form--error-field">
                          {errors.quantity}
                        </p>{" "}
                      </div>
                    )}
                  </div>
                )}
                <label className="inventory__form--label-field" htmlFor="">
                  Warehouse
                </label>
                <select
                  className="inventory__form--input-warehouse"
                  value={this.state.warehouseName}
                  onChange={(e) => this.handleDropdown(e, "warehouses")}
                >
                  {warehouseList.map((warehouse, index) => (
                    <option key={index} value={warehouse.warehouseName}>
                      {warehouse.warehouseName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="warehouse__form--bottom-container">
              <div className="warehouse__form--button-right">
                <Button
                  category="secondary"
                  type="submit"
                  text="Cancel"
                  clickEvent={this.handleCancel}
                />
              </div>
              <div className="warehouse__form--button-left">
                <Button
                  category="primary"
                  type="submit"
                  text="Save"
                  clickEvent={this.handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default InventoryEdit;

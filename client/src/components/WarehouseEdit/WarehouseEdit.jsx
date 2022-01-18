import { Component } from "react";
import axios from "axios";
import "./WarehouseEdit.scss";
import arrowbackSrc from "../../assets/icons/arrow_back-24px.svg";
import errSrc from "../../assets/icons/error-24px.svg";
import { Link } from "react-router-dom";
import Button from "../Buttons/Buttons";

class WarehouseEdit extends Component {

  state = {
    name: "",
    address: "",
    city: "",
    country: "",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
    errors: {},
  };

  getCurrentWarehouse = (id) => {
    axios
      .get(`http://localhost:8080/warehouse/${id}`)
      .then((response) => {
        const { foundWarehouse } = response.data;
        const { name, address, city, country, contact } = foundWarehouse;
        this.setState({
          name: name,
          address: address,
          city: city,
          country: country,
          contactName: contact.name,
          contactPosition: contact.position,
          contactPhone: contact.phone,
          contactEmail: contact.email,
        });
      })
      .catch((error) => console.log(error));
  };

    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            this.getCurrentWarehouse(id);
        }
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
      event.target.name === "contactEmail" &&
      !this.validateEmail(event.target.value)
    ) {
      this.setState({
        errors: {
          ...errors,
          [event.target.name]: "Invalid email",
        },
      });
    }

    if (event.target.name === "contactPhone" && event.target.value) {
      if (!this.validatePhone(event.target.value)) {
        this.setState({
          errors: {
            ...errors,
            [event.target.name]: "Invalid phone number. Eg: +1 (123) 456-7890",
          },
        });
      }
    } else if (!event.target.value) {
      this.setState({
        errors: {
          ...errors,
          [event.target.name]: " This field is required",
        },
      });
    }
  };

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  validatePhone = (phone) => {
    const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return re.test(phone);
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
    e.preventDefault();
    const validFormData = this.validateForm();
    if (validFormData) {
      axios
        .put(`http://localhost:8080/warehouse/${id}`, {
          id: id,
          name: this.state.name,
          address: this.state.address,
          city: this.state.city,
          country: this.state.country,
          contact: {
            name: this.state.contactName,
            position: this.state.contactPosition,
            phone: this.state.contactPhone,
            email: this.state.contactEmail,
          },
        })
        .then((response) => {
          this.props.history.goBack();
        });
    } else {
      alert("Failed to upload");
    }
  };

  render() {
    const {
      name,
      address,
      city,
      country,
      contactName,
      contactPosition,
      contactPhone,
      contactEmail,
      errors,
    } = this.state;

    return (
      <div className="warehouse">
        <div className="warehouse__wrapper">
          <div className="warehouse__header">
            <Link className="warehouse__link" to="/warehouse">
              <img className="warehouse__arrow" src={arrowbackSrc} alt="" />
            </Link>
            <h1 className="warehouse__title">Edit Warehouse</h1>
          </div>
          <form className="warehouse__form" action="">
            <div className="warehouse__form--top-container">
              <div className="warehouse__form--warehouse-details">
                <h2 className="warehouse__form--subtitle">Warehouse Details</h2>
                <label className="warehouse__form--label-field" htmlFor="">
                  Warehouse Name
                </label>
                <input
                  className={
                    !errors.name
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="Enter warehouse name"
                />
                {errors && errors.name && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />
                    <p className="warehouse__form--error-field">
                      {errors.name}
                    </p>
                  </div>
                )}

                <label className="warehouse__form--label-field" htmlFor="">
                  Street Address
                </label>
                <input
                  className={
                    !errors.address
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
      
                  type="text"
                  name="address"
                  value={address}
                  onChange={this.handleChange}
                  placeholder="Enter Street Address"
                />
                {errors && errors.address && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />{" "}
                    <p className="warehouse__form--error-field">
                      {errors.address}
                    </p>
                  </div>
                )}

                <label className="warehouse__form--label-field" htmlFor="">
                  City
                </label>
                <input
                  className={
                    !errors.city
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
                 
                  type="text"
                  name="city"
                  value={city}
                  onChange={this.handleChange}
                  placeholder="Enter City"
                />
                {errors && errors.city && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />
                    <p className="warehouse__form--error-field">
                      {errors.city}
                    </p>
                  </div>
                )}

                <label className="warehouse__form--label-field" htmlFor="">
                  Country
                </label>
                <input
                  className={
                    !errors.country
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
                 
                  type="text"
                  name="country"
                  value={country}
                  onChange={this.handleChange}
                  placeholder="Enter Country"
                />
                {errors && errors.country && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />{" "}
                    <p className="warehouse__form--error-field">
                      {errors.country}
                    </p>
                  </div>
                )}
              </div>
              <div className="warehouse__form--contact-details">
                <h2 className="warehouse__form--subtitle">Contact Details</h2>
                <label className="warehouse__form--label-field" htmlFor="">
                  Contact Name
                </label>
                <input
                  className={
                    !errors.contactName
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
                  
                  type="text"
                  name="contactName"
                  value={contactName}
                  onChange={this.handleChange}
                  placeholder="Enter Contact Name"
                />
                {errors && errors.contactName && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />
                    <p className="warehouse__form--error-field">
                      {errors.contactName}
                    </p>
                  </div>
                )}
                <label className="warehouse__form--label-field" htmlFor="">
                  Position
                </label>
                <input
                  className={
                    !errors.contactPosition
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
                
                  type="text"
                  name="contactPosition"
                  value={contactPosition}
                  onChange={this.handleChange}
                  placeholder="Enter position"
                />
                {errors && errors.contactPosition && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />
                    <p className="warehouse__form--error-field">
                      {errors.contactPosition}
                    </p>
                  </div>
                )}
                <label className="warehouse__form--label-field" htmlFor="">
                  Phone Number
                </label>
                <input
                  className={
                    !errors.contactPhone
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
                 
                  type="text"
                  name="contactPhone"
                  value={contactPhone}
                  onChange={this.handleChange}
                  placeholder="Enter Phone Number"
                />
                {errors && errors.contactPhone && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />{" "}
                    <p className="warehouse__form--error-field">
                      {errors.contactPhone}
                    </p>
                  </div>
                )}
                <label className="warehouse__form--label-field" htmlFor="">
                  Email
                </label>
                <input
                  className={
                    !errors.contactEmail
                      ? "warehouse__form--input-field"
                      : "warehouse__form--input-invalid"
                  }
                  
                  type="text"
                  name="contactEmail"
                  value={contactEmail}
                  onChange={this.handleChange}
                  placeholder="Enter Email"
                />
                {errors && errors.contactEmail && (
                  <div className="warehouse__form--error-state">
                    <img
                      className="warehouse__form--error-image"
                      src={errSrc}
                      alt="Error image"
                    />{" "}
                    <p className="warehouse__form--error-field">
                      {errors.contactEmail}
                    </p>
                  </div>
                )}
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

export default WarehouseEdit;

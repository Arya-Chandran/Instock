import React from "react";
import "./Delete.scss";
import close from "../../assets/icons/close-24px.svg";
import Button from "../Buttons/Buttons";
import icon from "../../assets/icons/delete_outline-24px.svg";

function Modal({ modal, closeModal, props }) {
  const {
    id,
    item,
    deleteInventoryItem,
    history,
    deleteInventoryItemFromWarehouse,
    warehouseid,
  } = props;

  const handleClick = (event) => {
    event.preventDefault();
    if (!warehouseid) {
      deleteInventoryItem(id);
      closeModal(event);
      history.push("/inventory");
    } else {
      deleteInventoryItemFromWarehouse(warehouseid, id);
      closeModal(event);
      history.push(`/warehouse/${warehouseid}`);
    }
  };
  return (
    <div
      className={`overlay ${
        modal ? "overlay overlay--visible" : "overlay overlay--hidden"
      }
    `}
    >
      <article className="delete">
        <div className="delete__wrapper">
          <img className="delete__close" src={close} onClick={closeModal} />
          <h4 className="delete__title">Delete {item}?</h4>
          <p className="delete__text">
            Please confirm that you'd like to delete the {item} from the
            inventory list. You won't be able to undo this action.
          </p>
          <div className="delete__container">
            <Button
              category="secondary"
              type="onClick"
              text="Cancel"
              clickEvent={closeModal}
            />
            <div className="delete__btn">
              <Button
                className={`delete__btn`}
                category="delete"
                type="onClick"
                text="Delete"
                clickEvent={handleClick}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export { Modal };

class DeleteInventoryFromWarehouse extends React.Component {
  state = { modal: false };

  openModal = (event) => {
    event.preventDefault();
    this.props.history.push(
      `/warehouse/${this.props.warehouseid}/${this.props.id}/delete-item`
    );
    this.setState({
      modal: true,
    });
  };

  closeModal = (event) => {
    event.preventDefault();
    this.setState({
      modal: false,
    });
    this.props.history.push(`/warehouse/${this.props.id}`);
  };

  render() {
    return (
      <>
        <img src={icon} type="button" onClick={this.openModal} />
        <Modal
          modal={this.state.modal}
          closeModal={this.closeModal}
          props={this.props}
        />
      </>
    );
  }
}

export { DeleteInventoryFromWarehouse };

class DeleteInventory extends React.Component {
  state = { modal: false };

  openModal = (event) => {
    event.preventDefault();
    this.props.history.push(`/inventory/${this.props.id}/delete-item`);
    this.setState({
      modal: true,
    });
  };

  closeModal = (event) => {
    event.preventDefault();
    this.setState({
      modal: false,
    });
    this.props.history.push("/inventory");
  };

  render() {
    return (
      <>
        <img src={icon} type="button" onClick={this.openModal} />
        <Modal
          modal={this.state.modal}
          closeModal={this.closeModal}
          props={this.props}
        />
      </>
    );
  }
}

export default DeleteInventory;

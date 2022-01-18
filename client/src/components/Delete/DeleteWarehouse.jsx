import React from "react";
import "./Delete.scss";
import close from "../../assets/icons/close-24px.svg";
import Button from "../Buttons/Buttons";
import icon from "../../assets/icons/delete_outline-24px.svg";

function Modal({ modal, closeModal, props }) {
    const { id, place, deleteWarehouse, history } = props;

    const handleClick = (event) => {
        event.preventDefault();
        deleteWarehouse(id);
        closeModal(event);
        history.push("/warehouse");
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
                    <img
                        className="delete__close"
                        src={close}
                        onClick={closeModal}
                    />
                    <h4 className="delete__title">Delete {place} warehouse?</h4>
                    <p className="delete__text">
                        Please confirm that you'd like to delete the {place}{" "}
                        from the list of warehouses. You won't be able to undo
                        this action.
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

class DeleteWarehouse extends React.Component {
    state = { modal: false };

    openModal = (event) => {
        event.preventDefault();
        this.props.history.push(`/warehouse/${this.props.id}/delete-warehouse`);
        this.setState({
            modal: true,
        });
    };

    closeModal = (event) => {
        event.preventDefault();
        this.setState({
            modal: false,
        });
        this.props.history.push("/warehouse");
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

export default DeleteWarehouse;

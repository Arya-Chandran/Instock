import editIcon from "../../assets/icons/edit-24px.svg";
import "./Buttons.scss";

function Button({ category, type, text, clickEvent }) {
    return (
        <button
            className={`button button--${category}`}
            type={type}
            onClick={clickEvent}
        >
            {text}
        </button>
    );
}

export default Button;

function EditButton({ type, clickEvent }) {
    return (
        <button
            className={`button button--edit`}
            type={type}
            onClick={clickEvent}
        >
            <img
                className="button__icon"
                src={editIcon}
                alt="Edit button icon."
            />
            Edit
        </button>
    );
}

export { EditButton };

import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);

  //Deleting  Contact
  const onDelete = () => {
    contactContext.deleteContact(id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
          style={{ float: "right" }}
        >
          {type.charAt(0).toUpperCase()}
          {type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fa fa-envelope-open" /> {email}
          </li>
        )}

        {phone && (
          <li>
            <i className="fa fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm ">Edit</button>
        <button className="btn btn-danger btn-sm " onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;

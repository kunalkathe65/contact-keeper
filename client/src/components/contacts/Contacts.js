import React, { Fragment, useContext, useEffect } from "react";

import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  //if there're no contacts
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4 style={{ textAlign: "center" }}>Please add contacts!!</h4>;
  }

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);
  return contacts !== null && !loading ? (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
    </Fragment>
  ) : (
    <Spinner />
  );
};
export default Contacts;

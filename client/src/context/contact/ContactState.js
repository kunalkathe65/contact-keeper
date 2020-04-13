import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "John Doe",
        email: "jd@gmail.com",
        phone: "777-777-7788",
        type: "personal",
      },
      {
        id: 2,
        name: "Sam Smith",
        email: "ss@gmail.com",
        phone: "774-777-7788",
        type: "personal",
      },
      {
        id: 3,
        name: "Sara Johnson",
        email: "sj@gmail.com",
        phone: "777-667-7788",
        type: "professional",
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Actions
  //Add contacts
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  //Delete contacts
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set current contact
  //Clear current contact
  //Update contact
  //Filter contacts
  //Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
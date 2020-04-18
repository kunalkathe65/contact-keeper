import React, { useContext, useRef, useEffect } from "react";

import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, filtered, clearFilter } = contactContext;
  const filteredText = useRef("");

  useEffect(() => {
    if (filtered === null) {
      filteredText.current.value = "";
    }
  });

  const onChange = (e) => {
    if (filteredText !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type="text"
        ref={filteredText}
        placeholder="Filter contacts..."
        name="filteredText"
        onChange={onChange}
      />
    </form>
  );
};
export default ContactFilter;

import React, { useContext } from "react";

import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    //checking if alerts array has any alerts
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.key} className={`alert alert-${alert.type}`}>
        <i className="fa fa-info-circle" /> {alert.msg}
      </div>
    ))
  );
};
export default Alert;

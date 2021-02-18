import React, { Fragment } from "react";
import { connect } from "react-redux";

const Alerts = function ({ alerts }) {
  console.log(alerts, alerts.length);
  return (
    <Fragment>
      {alerts.length >= 0 &&
        alerts.map((alert) => {
           return <div className={`alert alert-${alert.alertType}`} key={alert.id}>
            {alert.message}
          </div>;
        })}
    </Fragment>
  );
};

const mapStateToProps = function (state) {
  return {
    alerts: state.alertReducer,
  };
};

export default connect(mapStateToProps, {})(Alerts);

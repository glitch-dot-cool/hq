import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const Alert = ({ alerts }) => {
  console.log(alerts);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => {
      return (
        <AlertBox key={alert.id} alert={alert}>
          {alert.msg}
        </AlertBox>
      );
    })
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

const colorSelector = ({ alert }) => {
  switch (alert.alertType) {
    case "danger":
      return "red";
    case "success":
      return "green";
    default:
      return "grey";
  }
};

const AlertBox = styled.div`
  background-color: ${props => colorSelector(props)};
`;

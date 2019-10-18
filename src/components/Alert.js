import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";

import colors from "../styles/colors";

const Alert = ({ alerts }) => {
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
      return colors.danger;
    case "success":
      return colors.success;
    default:
      return colors.midgrey;
  }
};

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }

  to {
    opacity: 0;
    transform: translateY(-50px);
  }
`;

const AlertBox = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => colorSelector(props)};
  font-size: 2rem;
  padding: 2rem;
  margin-bottom: 2rem;
  animation: ${fadeOut} 3.05s ease-in-out;
`;

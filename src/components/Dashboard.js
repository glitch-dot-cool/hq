import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Head from "./Head";

const Dashboard = ({ loading, user }) => {
  return (
    <div>
      <Head title="dashboard"></Head>
      <h1>dashboard</h1>
      {!loading && user !== null && <h3>hello {user.name}</h3>}
    </div>
  );
};

Dashboard.protoTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);

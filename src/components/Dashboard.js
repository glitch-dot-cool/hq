import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Head from "./Head";
import { PageHeader } from "../utils/utilComponents";

const Dashboard = ({ loading, user }) => {
  return (
    <div>
      <Head title="dashboard"></Head>
      <PageHeader>dashboard</PageHeader>
      {!loading && user !== null && <h3>hello {user.name}</h3>}
    </div>
  );
};

Dashboard.protoTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);

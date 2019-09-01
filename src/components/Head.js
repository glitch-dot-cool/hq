import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ title }) => {
  return <Helmet title={`glitcHQ | ${title}`}></Helmet>;
};

export default Head;

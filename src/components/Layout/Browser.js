import React from "react";
import styled from "styled-components";

import Head from "../Head";

const BrowserContainer = styled.div``;

const Browser = site => {
  return (
    <BrowserContainer>
      <Head title={site.title}></Head>
    </BrowserContainer>
  );
};

export default Browser;

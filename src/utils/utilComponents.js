import styled from "styled-components";

import colors from "../styles/colors";

const PageHeader = styled.h1`
  color: ${colors.offwhite};
  font-size: 4rem;
`;

const Button = styled.button`
  background-color: ${colors.midgrey};
  color: ${colors.offwhite};
  font-size: 2rem;
  padding: 0.5rem;
  border: none;
  transition: 0.2s ease-out all;

  &:hover {
    color: ${colors.nearblack};
    background-color: ${colors.lightgrey};
    cursor: pointer;
  }
`;

export { PageHeader, Button };

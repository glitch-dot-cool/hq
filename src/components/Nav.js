import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import colors from "../styles/colors";

const Nav = () => {
  return (
    <SidebarNavLinksWrapper>
      <SideBarNavLinks>
        <SideBarNavLink to="/">home</SideBarNavLink>
        <SideBarNavLink to="/about">about</SideBarNavLink>
        <SideBarNavLink to="/jhkasdfjklas">non-existent path</SideBarNavLink>
        {/* <SideBarNavLink to="/">files</SideBarNavLink>
            <SideBarNavLink to="/">tools</SideBarNavLink>
            <SideBarNavLink to="/">edit website</SideBarNavLink>
            <SideBarNavLink to="/">view website</SideBarNavLink>
            <SideBarNavLink to="/">discord</SideBarNavLink>
            <SideBarNavLink to="/">trello</SideBarNavLink>
            <SideBarNavLink to="/">calendar</SideBarNavLink>
            <SideBarNavLink to="/">soundcloud</SideBarNavLink>
            <SideBarNavLink to="/">bandcamp</SideBarNavLink> */}
      </SideBarNavLinks>
    </SidebarNavLinksWrapper>
  );
};

const SidebarNavLinksWrapper = styled.div``;

const SideBarNavLinks = styled.nav`
  padding: 2rem;
`;

const SideBarNavLink = styled(NavLink)`
  display: block;
  font-size: 3rem;
  color: ${colors.lightgrey};

  :hover {
    color: ${colors.offwhite};
    text-decoration: line-through;
    cursor: pointer;
    background-color: ${colors.darkgrey};
  }
`;

export default Nav;

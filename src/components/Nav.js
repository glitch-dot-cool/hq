import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import styled from "styled-components";

import colors from "../styles/colors";

import Home from "./Home";
import About from "./About";
import Error from "./Error";

const Nav = () => {
    return (
      <BrowserRouter>
        <SidebarLinksWrapper>
          <SideBarLinks>
            <SideBarLink to="/">home</SideBarLink>
            <SideBarLink to="/about">about</SideBarLink>
            <SideBarLink to="/jhkasdfjklas">non-existent path</SideBarLink>
            {/* <SideBarLink to="/">files</SideBarLink>
            <SideBarLink to="/">tools</SideBarLink>
            <SideBarLink to="/">edit website</SideBarLink>
            <SideBarLink to="/">view website</SideBarLink>
            <SideBarLink to="/">discord</SideBarLink>
            <SideBarLink to="/">trello</SideBarLink>
            <SideBarLink to="/">calendar</SideBarLink>
            <SideBarLink to="/">soundcloud</SideBarLink>
            <SideBarLink to="/">bandcamp</SideBarLink> */}
          </SideBarLinks>
        </SidebarLinksWrapper>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route component={Error}></Route>
        </Switch>
      </BrowserRouter>
    );
}

const SidebarLinksWrapper = styled.div``;

const SideBarLinks = styled.nav`
  padding: 2rem;
`;

const SideBarLink = styled(Link)`
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
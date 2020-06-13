import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const Navs = () => {
  const history = useHistory();
  return (
    <NavbarStyle bg='light' expand='lg' sticky='top'>
      <Navbar.Brand href='#home'>
        <LinkStyle
          className='links'
          to={sessionStorage.getItem("gig_token") ? "/" : "/home"}
        >
          <Orange>Find</Orange> <Teal>Gig</Teal>
        </LinkStyle>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {!sessionStorage.getItem("gig_token") ? (
            <>
              <NavLinkStyle>
                <LinkStyle className='links' to='/login'>
                  Login
                </LinkStyle>
              </NavLinkStyle>
              <NavLinkStyle>
                <LinkStyle className='links' to='/register'>
                  Register
                </LinkStyle>
              </NavLinkStyle>
            </>
          ) : (
            <>
              <NavLinkStyle>
                <LinkStyle className='links' to='/profile'>
                  Profile
                </LinkStyle>
              </NavLinkStyle>
              <NavLinkStyle
                onClick={() => {
                  sessionStorage.removeItem("gig_token");
                  window.location.href = window.location.origin + "/home";
                }}
              >
                Logout
              </NavLinkStyle>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </NavbarStyle>
  );
};

export default Navs;

const Orange = styled.span`
  color: orangered;
`;
const Teal = styled.span`
  color: teal;
`;

const NavbarStyle = styled(Navbar)`
  padding-left: 5%;
  padding-right: 5%;

  @media (max-width: 769px) {
    padding-left: 1em;
    padding-right: 1em;
  }
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #555;
`;
const NavLinkStyle = styled(Nav.Link)`
  text-decoration: none;
  color: red;
`;

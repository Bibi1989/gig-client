import React, { useContext, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Avatar } from "../commons/style";
import { GigContext } from "../../context/GigProvider";

const Navs = () => {
  const { fetchProfileGig, gig } = useContext(GigContext);
  const history = useHistory();
  console.log(gig);

  useEffect(() => {
    fetchProfileGig();
  }, []);
  return (
    <NavbarStyle bg='light' expand='lg' sticky='top'>
      {sessionStorage.getItem("gig_token") && (
        <NavPosition>
          <Avatar width='35px'>
            {gig === undefined ? (
              <Spinner
                animation='border'
                variant='light'
                style={{ fontSize: "0.3em", width: "2em", height: "2em" }}
              />
            ) : (
              <>
                {gig[0] !== undefined && gig[0].first_name[0].toUpperCase()}
                {gig[0] !== undefined && gig[0].last_name[0].toUpperCase()}
              </>
            )}
          </Avatar>
        </NavPosition>
      )}
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

const NavPosition = styled.div`
  position: absolute;
  top: 3em;
  right: 210px;

  @media (max-width: 1069px) {
    right: 200px;
  }
  @media (max-width: 769px) {
    right: 110px;
  }
`;
const Orange = styled.span`
  color: orangered;
`;
const Teal = styled.span`
  color: teal;
`;

const NavbarStyle = styled(Navbar)`
  padding-left: 5%;
  padding-right: 5%;
  position: relative;

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

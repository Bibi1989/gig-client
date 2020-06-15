import React, { useContext, useEffect } from "react";
import { Navbar, Nav, Spinner } from "react-bootstrap";
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

  function fullName(gig: any): string {
    return `${gig[0].first_name} ${gig[0].last_name}`;
  }
  return (
    <NavbarStyle bg='light' expand='lg' sticky='top'>
      <p>
        {gig[0] !== undefined && gig[0].first_name[0]}
        {gig[0] !== undefined && gig[0].last_name[0]}
      </p>
      {sessionStorage.getItem("gig_token") && (
        <NavPosition title={gig[0] !== undefined ? fullName(gig) : ""}>
          <Avatar width='35px'>
            {gig === undefined ? (
              <Spinner
                animation='border'
                variant='light'
                style={{ fontSize: "0.3em", width: "2em", height: "2em" }}
              />
            ) : (
              <div>
                {gig[0] !== undefined && gig[0].profile_image !== null ? (
                  <img
                    src={gig[0] !== undefined && gig[0].profile_image}
                    alt='person image'
                  />
                ) : (
                  // <div>
                  //   {gig[0] === undefined
                  //     ? "N"
                  //     : gig[0].first_name[0].toUpperCase()}
                  //   {gig[0] === undefined
                  //     ? "N"
                  //     : gig[0].last_name[0].toUpperCase()}
                  // </div>
                  ""
                )}
              </div>
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
  right: 215px;
  display: flex;

  @media (max-width: 1069px) {
    right: 200px;
  }
  @media (max-width: 769px) {
    right: 100px;
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

  p {
    position: absolute;
    right: 250px;
    color: #777777;
    font-weight: 500;
  }

  @media (max-width: 769px) {
    padding-left: 1em;
    padding-right: 1em;

    p {
      right: 150px;
    }
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

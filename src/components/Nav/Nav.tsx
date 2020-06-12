import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Navs = () => {
  const history = useHistory();
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Another action</NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item>
          </NavDropdown>
          {!sessionStorage.getItem("gig_token") ? (
            <>
              <Nav.Link>
                <Link to='/login'>Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/register'>Register</Link>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link>
                <Link to='/profile'>Profile</Link>
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  sessionStorage.removeItem("gig_token");
                  history.push("/home");
                }}
              >
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navs;

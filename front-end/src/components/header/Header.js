import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faCartShopping} from "@fortawesome/free-solid-svg-icons" ;
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";

import DropDown from '../dropdown/DropDown';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand= "lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{"color": 'gold'}}>
          <FontAwesomeIcon icon={faLaptop}/>Computer Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav 
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: '100px'}}
            navbarScroll>
              <NavLink className="nav-link" to="/">Home</NavLink>
              {/* <NavLink className="nav-link" to="/watchList">Watch List</NavLink> */}
              <DropDown/>


          </Nav>
          <NavLink to="/Cart" style={{"color": 'gold'}}>
          <FontAwesomeIcon 
          icon={faCartShopping}
          />
          </NavLink>
         
          {/* <Button variant='outline-info' className='me-2'>Login</Button>
          <Button variant='outline-info'>Register</Button> */}


        </Navbar.Collapse>

      </Container>

    </Navbar>
  )
}
export default Header;

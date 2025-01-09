import React, {useState}from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from 'react-bootstrap/Dropdown';
import {faCartShopping} from "@fortawesome/free-solid-svg-icons" ;
import { faLaptop, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DropDown from '../dropdown/DropDown';
import { useDispatch } from 'react-redux';
import { addItem, updateQuantity, clearCart } from '../cart/CartSlice';

const Header = ({username ,role, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToCart = () =>{
    const currentPath = window.location.pathname;
    navigate("/Cart", {state:{from:currentPath}});
  }
  const handleSearch= (e)=>{
    if (e.key === "Enter"){
      if (searchTerm.trim()){
        onSearch(searchTerm);
        navigate("/Search")

      }
    }

  }


  const handleLogOut = () => {
        
    dispatch(clearCart())
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate("/Login");

  };
  return (
    <Navbar bg="dark" variant="dark" expand= "lg" width="100vw">
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
              
              <DropDown/>
              
          </Nav>
          <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                style={{ padding: '10px',  width: '300px', marginRight:'5%', marginBottom:'0.5%' }}
          />
         

        <Dropdown data-bs-theme="dark" style={{  marginRight:'5%', marginBottom:'0.5%' }}>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            <FontAwesomeIcon icon={faUser}  style={{color: 'gold'}}/>
          </Dropdown.Toggle>
      

          <Dropdown.Menu>
            {username && role=="admin" ? (
              <>
              <Dropdown.ItemText>Welcome, {username}</Dropdown.ItemText>
              <Dropdown.Item href="/admin/Dashboard">Product Management</Dropdown.Item>
              <Dropdown.Item href="/admin/UserBoard">User Management</Dropdown.Item>
              <Dropdown.Item href="https://yushi3333.github.io/display_web/">About Me</Dropdown.Item>


              <Dropdown.Divider />

              <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
              
              </>
              
            ): username && role==='user' ? (
              <>
              <Dropdown.ItemText>Welcome, {username}</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
              
              </>


            ):(
              <>
              <Dropdown.Item href="/Login">Login</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/Register">Register</Dropdown.Item>
            
              

              </>

            )

            }     
          </Dropdown.Menu>
        </Dropdown>
          
          <button onClick={goToCart} style={{ background: 'none', border: 'none', color: 'gold',marginRight:'5%', marginBottom:'0.5%' }}>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
         
          
        </Navbar.Collapse>

      </Container>

    </Navbar>
  )
}
export default Header;

import React, {useState}from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList}from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import "./sideBar.css"
const Sidebar = () => {
  const [activeNav, setActiveNav] = useState("#");
  return (
    <nav id = "nav_content">
      <a id = 'link'href="#product-form" onClick={()=>setActiveNav('#product-form')} className={activeNav === "#product-form" ? "active" : ""}><FontAwesomeIcon color='white' style={{width:"50%"}}icon={faPlus} /></a>
      <a id = 'link'href="#product-list" onClick={()=>setActiveNav('#product-list')} className={activeNav === "#product-list" ? "active" : ""}><FontAwesomeIcon color='white' style={{width:"50%"}}icon={faList}/></a>
    </nav>
    
  );
};

export default Sidebar;
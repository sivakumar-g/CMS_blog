import React, { useState ,useContext,useRef,useEffect} from 'react';
import { Link ,useHistory} from 'react-router-dom';
import { Collapse, Navbar,Button, NavbarToggler,FormControl,Form,NavDropdown, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import CreatePost from './screen/Createpost';
import {userContext} from '../App'

export default function AppNavbar(props) {

  const {state,dispatch} = useContext(userContext)

  const history = useHistory()


  const renderList = ()=>{
    if(state){
        return [
         <li><Link to="/createpost">Create Post</Link></li>,
         <li><Link to="/">Home</Link></li>,

<button className="btn #c62828 red darken-3"
         onClick={()=>{
           localStorage.clear()
           dispatch({type:"CLEAR"})
           history.push('/signin')
         }}
         >
             Logout
         </button>


         
        ]
    }else{
      return [
       <li><Link to="/signin">Signin</Link></li>,
       <li><Link to="/signup">Signup</Link></li>
      
      ]
    }
  }







  
  return (
   
  <nav>
  <div className="nav-wrapper white">
    <a href="/" className="brand-logo">CMS</a>
    <ul id="nav-mobile" className="right hide-on-med-and-down" >
    {renderList()}
    </ul>
  </div>
</nav>
        )
}




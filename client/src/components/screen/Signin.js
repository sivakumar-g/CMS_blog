import React, { Component,useState,useContext } from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'

import M from 'materialize-css'
import { userContext } from '../../App'

export default function Signin() {

    const {state,dispatch} = useContext(userContext)


    const history = useHistory()

    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }


    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }




    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
    
        let body = {
            email: Email,
            password: Password,
         
        }
 //  console.log(body);

     
           axios.post('http://localhost:5000/signin', 
           {
            email: Email,
            password: Password,
        }
           )
           .then((res)=>
               { console.log(res.data);
                M.toast({html: "Signin successful"})
                localStorage.setItem("jwt",res.data.token)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                  dispatch({type:"USER", payload:res.data.user})         
                history.push('/') })
            .catch(err=>
                 { M.toast({html: "something went wrong"})
                console.log(err);
                     })
            
            }




                   
    return (
        <div>
           
           <div>
           <div class="mycard">

              <div className="card auth-card input-field">
            <h2>CMS</h2>

            <form onSubmit={onSubmitHandler} >


<div className="form-group">
            <input

            type="email" className="form-control"
            placeholder="email"
            value={Email}  onChange={onEmailHandler}  required
           />
            </div>


<div className="form-group">
            <input className="form-control"
           type="password"
            placeholder="password"
            value={Password} onChange={onPasswordHandler}  required 
           />
           </div>

              
               <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
              type ="submit"
               >
                signin
            </button>

            </form >

            </div>
            
            <h5>
            <Link to="/signup">Dont have an account ?</Link>
            </h5>


           </div>
        </div>






        </div>
    )



}


/*






            return (
        <div>
           <div class="mycard">

              <div className="card auth-card input-field">
            <h2>CMS</h2>

            <input
            type="text"
            placeholder="email"
           />

            <input 
           type="text"
            placeholder="password"
           />


              
               <button className="btn waves-effect waves-light #64b5f6 blue darken-1" >
                Login
            </button>
            </div>

            <h5>
                <Link to="/signup">Dont have an account ?</Link>
            </h5>

           </div>
        </div>
    )



    */
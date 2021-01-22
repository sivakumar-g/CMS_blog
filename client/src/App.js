import React ,{createContext,useEffect,useReducer,useContext } from 'react';
import AppNavbar from './components/AppNavbar';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screen/Home';
import Signin from './components/screen/Signin';
import Signup from './components/screen/Signup';
import CreatePost from './components/screen/Createpost';
import {reducer,initialState} from './reducers/userReducer'


export const userContext = createContext()

const Routing = ()=>{

  const history = useHistory()
  const {state,dispatch} = useContext(userContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
           history.push('/signin')
    }
  },[])

  return(
    <Switch>

<Route exact path='/'>  <Home/>  </Route>
<Route path='/signin'>  <Signin/>  </Route>
<Route path='/signup'>  <Signup/>  </Route>
<Route path='/createpost'>  <CreatePost/>  </Route>

      
    </Switch>
  )
}







function App() {
  const [state,dispatch] = useReducer(reducer,initialState)


  return (
    <userContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
<AppNavbar></AppNavbar>
<Routing></Routing>
</BrowserRouter>
    </userContext.Provider>

);
}

export default App;

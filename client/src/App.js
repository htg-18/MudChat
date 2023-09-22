import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Messenger from "./pages/messenger/messenger";
import {useContext} from "react"
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route, Redirect,Navigate
} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
function App() {
  const {user}=useContext(AuthContext)
  return(
<Router>
    <Routes>
      <Route path="/" element={user ?<Home/>:<Register/>} />
  
      {/* </Route> */}
      <Route path="/profile/:username" element={<Profile/>}/>
         {/* <Profile/>
      </Route> */}
      <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
         {/* <Login/>
      </Route> */}
      <Route path="/register" element={user?<Navigate to="/"/>:<Register/>}/>
      <Route path="/messenger" element={!user?<Navigate to="/"/>:<Messenger/>}/>
         {/* <Register/>
      </Route> */}
      </Routes>
      
  </Router>
  )
  
  // return <Home/>
  // return <Profile/>
}

export default App;

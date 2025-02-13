import { useState , useEffect } from "react";
import { Routes ,Route } from "react-router-dom";
import ReactDOM from "react-dom";
import './App.css';
import Login from "./login/login.js"; 
import Register from "./register/register.js";
import Landing from "./landingPage/landing.js";
import Dashboard from "./dashboard/dashboard.js";
import Navbar from "./navbar/navbar.js"; 
import Friends from "./friends/friends.js";
function App() {
	const [isLoggedIn , setIsLoggedIn] = useState(false);
	useEffect(() =>{
		const token = localStorage.getItem('token');
		if (token){
			setIsLoggedIn(true);

		}
		else {
			setIsLoggedIn(false);
		}
	},[]);
  return (
	<div className="body">
		{isLoggedIn} <Navbar/> 
		<Routes>
			<Route path = "/friends" element = {<Friends/>}/>
			<Route path = "/" element = { isLoggedIn ? <Dashboard/> : <Landing/>} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element= {<Login/>}/>
		</Routes>
	</div>
  );
}

export default App;

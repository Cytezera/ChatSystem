import { useState , useEffect } from "react";
import { Routes ,Route, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import './App.css';
import Login from "./login/login.js"; 
import Register from "./register/register.js";
import Landing from "./landingPage/landing.js";
import Dashboard from "./dashboard/dashboard.js";
import Navbar from "./navbar/navbar.js"; 
import Friends from "./friends/friends.js";
import Profile from "./profile/profile.js";
function App() {
	const [isLoggedIn , setIsLoggedIn] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true);
	const location = useLocation();
	useEffect(() =>{
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		if (token){
			setIsLoggedIn(true);

		}
		else {
			setIsLoggedIn(false);
		}
		if (user) {
			const parsedUser = JSON.parse(user);
			setShowNavbar(parsedUser.username !== "");
		}else {
			setShowNavbar(false);
		}
	},[location])
  return (
	<div className="body">
		{showNavbar && <Navbar/> }  
		<Routes>
			<Route path = "/friends" element = {<Friends/>}/>
			<Route path = "/" element = { isLoggedIn ? <Dashboard/> : <Landing/>} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element= {<Login/>}/>
			<Route path="/profile" element = {<Profile/>}/>
		</Routes>
	</div>
  );
}

export default App;

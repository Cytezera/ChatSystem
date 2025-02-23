import React, {useState,useEffect, useRef} from "react"; 
import axios from "axios"; 
import "./login.css";
import { useNavigate } from "react-router-dom";

const API_URL = `${process.env.REACT_APP_API_URL}/login` ; 
const Login = ({onlogin}) => {
	const topBarRef = useRef(null);
	const [username, setUsername] = useState(""); 
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoginPage, setIsLogInPage] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (window.location.pathname === "/login"){
			setIsLogInPage(true);
		}else {
			setIsLogInPage(false);
		}	
	},[]);
	const checkValid = () => {
		axios.post(API_URL, {username, password})
			.then((response) => {
				console.log(response);
				if (response.data.loggedIn) {
					localStorage.setItem('token', response.data.token);
					localStorage.setItem('user', JSON.stringify(response.data.user));
					navigate("/");
					setError("");	
				} else {
					setError(response.data.message);
					setPassword("");
					topBarRef.current.style.display = 'flex' ; 
					setTimeout(function(){
						topBarRef.current.style.display = 'none';
					},1500);		
				}
			})
	};
	if (!isLoginPage){
		return null;
	}		
	return (
			<div class="container">
				<h1 class= "log-in-text">Log In </h1> 
				<input 
					
					class="bar"
					type = "text"
					placeholder = "Username" 
					value = {username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input  
					class="bar"
					type = "password" 
					placeholder = "Password" 
					value = {password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div ref={topBarRef} class="error-container"> 
					<h1 class="error">ERROR</h1>
					<h2 class="error2">{error}</h2>
				</div>
				<div class="button-row">
					<button class= "button" onClick ={checkValid}> 
						Log In 	
					</button> 
					<a href="register">Register</a>
				</div>
			</div>
	);	
}
export default Login;

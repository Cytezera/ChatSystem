import React, {useState} from "react"; 
import axios from "axios"; 
import "./login.css";

const API_URL = "http://localhost:5000/login" ; 
const topBar = document.querySelector('.error-container');
const Login = ({onlogin}) => {
	const [username, setUsername] = useState(""); 
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const checkValid = () => {
		axios.post(API_URL, {username, password})
			.then((response) => {
				console.log(response);
				if (response.data.loggedIn) {
					alert (response.data.message);	
					setError("");	
				} else {
					setError(response.data.message);
					setPassword("");
					topBar.style.display = 'flex' ; 
					setTimeout(function(){
						topBar.style.display = 'none';
					},1500);		
				}
			})
	};
	
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
				<div class="error-container"> 
					<h1 class="error">ERROR</h1>
					<h2 class="error2">{error}</h2>
				</div>
				<div class="butotn-row">
					<button class= "button" onClick ={checkValid}> 
						Log In 	
					</button> 
				</div>
			</div>
	);	
}
export default Login;

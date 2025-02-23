import React, {useState} from "react"; 
import axios from "axios"; 

const API_URL = "${process.env.REACT_APP_API_URL}/login" ; 

const Login = ({onlogin}) => {
	const [username, setUsername] = useState(""); 
	const [password, setPassword] = useState("");
	const checkValid = () => {
		axios.post(API_URL, {username, password})
			.then((response) => {
				console.log(response);
				if (response.data.loggedIn) {
					alert (response.data.message);	
				
				} else {
					alert (response.data.message);
					setPassword("");
				}
			})
	};
	
	return (
		<div>
			<h1>Log In </h1> 
			<input 
				type = "text"
				placeholder = "Username" 
				value = {username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input  
				type = "text" 
				placeholder = "Password" 
				value = {password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick ={checkValid}> 
				Log In 	
			</button> 
		</div>
	);	
}
export default Login;

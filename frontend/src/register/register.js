import React, {useState, useEffect, useRef} from "react" ; 
import { useNavigate } from "react-router-dom";
import axios from "axios" ; 
import styles from "./register.module.css"; 

const API_URL = "http://localhost:5000/register";
const Register = () => {
	const errorMessage = useRef(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isPage, setIsPage] = useState(false);
	const navigate = useNavigate();		
	const [error, setError] = useState("");
	useEffect (() => {
		if (window.location.pathname === "./register"){
			setIsPage(true);
		}else{
			setIsPage(false);
		}
	},[]);
	if (isPage){
		return null;
	}
	const checkRegister = () => {
		if (newPassword !== password){
			setError("Password does not match");	
			errorMessage.current.style.display = 'flex';
			setNewPassword("");
			setPassword("");
			return;
		}
		if (!username || !password || !email || !newPassword){
			setError("Please fill in everything");
			errorMessage.current.style.display = 'flex';
			return;
		}
		axios.post(API_URL, {username,email, password})
			.then((response) => {
				if (response.data.registration){
					navigate("/login");	
				}else {
					setError(response.data.message);
					errorMessage.current.style.display = 'flex';		
				}						
			});	
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.registertext} >Register</h1>
			<div className = {styles.barcontainer}>
				<h1 className = {styles.bartitle}>Username</h1>
				<input 
					className={styles.bar}
					type = "text" 
					value = {username}
					onChange={(e) => setUsername(e.target.value)}		
				/>
			</div>
			<div className = {styles.barcontainer}>
				<h1 className = {styles.bartitle}> email</h1>
				<input 
					className={styles.bar}
					type="text"
					value = {email}
					onChange={(e) => setEmail(e.target.value)}		
				/>
			</div>
			<div className = {styles.barcontainer}>
				<h1 className = {styles.bartitle}> Password </h1>
				<input 
					className={styles.bar}
					type = "password"
					value = {password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className = {styles.barcontainer}>
				<h1 className = {styles.bartitle}> Retype Password </h1>
				 <input className = {styles.bar}
					type = "password"
					value = {newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</div>
			<div ref={errorMessage} className = {styles.errorcontainer}>
				<h1 className = {styles.error}> Error </h1>
				<h1 className = {styles.error2}> {error}</h1>
			</div>	
			<button className={styles.button} onClick= { checkRegister}> Register </button>
		</div>
	);
}
export default Register;

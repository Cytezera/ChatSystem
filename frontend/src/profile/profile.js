import react, { useState, useEffect  } from "react" ; 
import styles from "./profile.module.css"; 
import { useNavigate } from "react-router-dom" ;
const Profile = () => { 
	const [username , setUsername ] = useState(() => {
		const storedUsername = localStorage.getItem("user");
		return storedUsername ? JSON.parse(storedUsername).username : ""; 		
	});		
	const navigate = useNavigate();
	const buttonClick = () => {
		localStorage.setItem("user",JSON.stringify({username : ""}));
		setUsername("");	
		navigate("/login");
	};		
	return (

		<div className = {styles.profile}>
			<button className={styles.logout} onClick={buttonClick}>Log Out</button>	
		</div>
	);
};

export default Profile;

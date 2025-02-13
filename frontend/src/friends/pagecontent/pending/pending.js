import react, {useState, useEffect } from "react" ;
import axios from "axios"; 
import styles from "./pending.module.css";

const API_URL = "http://localhost:5000/pending";

const Pending = () => { 
	const [pending,setPending] = useState([]);
	const [username , setUsername ] = useState(() => {
		const storedUsername = localStorage.getItem("user");
		return storedUsername ? JSON.parse(storedUsername).username : " " ;
	});
	useEffect (() =>{
		axios.get(`${API_URL}?username=${username}`)
			.then((response)=>{
				setPending(response.data);			
			});
	},[username]);	
	return (
		<div className={styles.pendingcontainer}> 
			
		</div>
	)
}
export default Pending;

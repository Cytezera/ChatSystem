import React, { useState, useRef, useEffect } from "react" ; 
import axios from "axios"; 
import styles from "./people.module.css" ; 

const API_URL = "http://localhost:5000/people"; 

const People = () => {
	const [people,setPeople] = useState([]);
	const [username,setUsername] = useState(() =>{
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser).username : " ";
	}); 
	useEffect(() => {
		axios.get(`${API_URL}?username=${username}`)
			.then((response) => {
				setPeople(response.data);
		});
	},[username]);

	return (
		<div className={styles.sidebar}> 
			{people.map((p,index) => (
				<button key = {p.friend_id } className={styles.peopleContainer}>
					{p.friend}	
				</button>
			))}	
		</div>
	)

}

export default People;

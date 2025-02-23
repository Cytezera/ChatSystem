import React, { useState, useRef, useEffect } from "react" ; 
import axios from "axios"; 
import styles from "./people.module.css" ; 

const API_URL = `${process.env.REACT_APP_API_URL}/people`; 

const People = ({onSelect}) => {
	const [people,setPeople] = useState([]);
	const [selectedPeople, setSelectedPeople] = useState("");
	const [username,setUsername] = useState(() =>{
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser).username : " ";
	}); 
	useEffect(() => {
		console.log(API_URL);
		axios.get(`${API_URL}?username=${username}`)
			.then((response) => {
				setPeople(response.data);
		});
	},[username]);

	const handleSelect = (friend_id) => {
		setSelectedPeople(friend_id); 
		onSelect(friend_id);
	}
	return (
		<div className={styles.sidebar}> 
			{people.map((p,index) => (
				<button key = {p.friend_id } onClick={() => handleSelect(p.friend_id) } className={`${styles.peopleContainer} ${ selectedPeople === p.friend_id ? styles.selected : ""}`}>
					{p.friend}	
				</button>
			))}	
		</div>
	)

}

export default People;

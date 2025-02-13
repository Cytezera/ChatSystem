import react, { useState, useEffect } from "react" ; 
import axios from "axios"; 
import styles from "./add.module.css";

const API_URL = "http://localhost:5000/add";

const Add = () => {
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState(() => {
		const storedUsername = localStorage.getItem("user");
		return 	storedUsername ? JSON.parse(storedUsername).username: " ";
	});
	const handleAddFriend = (target) => {
		setUsers((users) =>
			users.map((user)=> 
				user.username === target ? { ...user, status:"pending"} : user
			)

		);
		axios.post(`${API_URL}/addfriend`, {username, target} ) 
			.then((response) => {
				console.log ("target: " , target) ;
				console.log ("username: " , username) ;
			}); 
	}
	const searchResults = () => {
		axios.post(API_URL, {username, search})
			.then((response) => {
				setUsers(response.data); 
			});			
		
	}
	return (
		<div className ={styles.add}>	
			<div className = {styles.header}>
				<input className={styles.input} type = "text" value = {search} onChange={(e)=> setSearch(e.target.value)} placeholder = "username"/>
				<button onClick={searchResults} className = {styles.button}>Search</button>
			</div>
			<div className = {styles.addcontainer}> 
				{users.map((user,index) => (
					<div key={index} className = {styles.section}>
						<div className ={styles.sectiontext}>
							{user.username}
						</div>
						<div className = {styles.sectionbutton}>
							{user.status === "accepted" ? null : 
								user.status === "pending" ? (
									<span className={styles.pending}>🟡</span>
									
								): user.status === "declined" ? (
									<span className={styles.declined}>🔴</span>
								):(
								<button onClick={() => handleAddFriend(user.username)} className={styles.addbutton}>+</button>		
							)} 
						</div>
					</div>	
				))}

			</div>
		</div>
	)
}
export default Add;

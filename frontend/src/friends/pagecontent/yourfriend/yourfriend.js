import react, { useState, useEffect } from "react" ;
import axios from "axios"; 
import styles from "./yourfriend.module.css";

const API_URL = `${process.env.REACT_APP_API_URL}/people`; 

const YourFriend = () => {
	const [friends,setFriends] = useState([]); 
	const [username, setUsername] = useState( () => {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user).username : " " ; 
	});
	useEffect( () =>{
		axios.get(`${API_URL}?username=${username}`)
			.then((response)=>{
				setFriends(response.data);
		});
	},[username]);
	return (
		<div className={styles.yourfriend}>
			<h1 className ={styles.text}> YOUR FRIENDS </h1> 
			<div className={styles.friendContainer}>
				{friends.map((friend) => (
					<div key = {friend.friend_id} className ={styles.section}>
						{friend.friend}
					</div>
				))}	
			</div>
		</div>
	
	)
}
export default YourFriend;

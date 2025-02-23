import react, {useState, useEffect } from "react" ;
import axios from "axios"; 
import styles from "./pending.module.css";

const API_URL = `${process.env.REACT_APP_API_URL}/pending`;

const Pending = () => { 
	const [pending,setPending] = useState([]);
	const [username , setUsername ] = useState(() => {
		const storedUsername = localStorage.getItem("user");
		return storedUsername ? JSON.parse(storedUsername).username : " " ;
	});
	const accept = (id) => {
		setPending((pending) => 
			pending.map((p) => 
				p.friend_id === id ? { ...p, status:"accepted" } : p		
			)
		);

		axios.post(API_URL, {id})
			.then((response)=>{

		
			console.log(response.data);
			});
	}
	useEffect (() =>{
		axios.get(`${API_URL}?username=${username}`)
			.then((response)=>{
				setPending(response.data);			
			});
	},[username]);	
	return (
		<div className={styles.pending}> 
			<div className ={styles.text}> 
				<h1> Pending </h1>
			</div>	
			<div className = {styles.pendingcontainer}>
				{pending.map((p)=>(
					<div key = {p.friend_id} className={styles.section}>
						<div className = {styles.sectiontext}>
							{p.friend}
						</div>
						<div className = {styles.sectionbutton}>
							{ p.status === "accepted" ? null : 
								<button onClick={ () => accept(p.friend_id)}  className={styles.button}>+</button>
							}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
export default Pending;

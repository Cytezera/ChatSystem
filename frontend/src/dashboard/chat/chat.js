import react, { useState, useEffect, useRef } from "react" ; 
import axios from "axios" ; 
import styles from "./chat.module.css";
import io from "socket.io-client"; 

const socket = io("http://localhost:5000");
const API_URL = ("http://localhost:5000/chat");
const Chat = ({chat}) => {
	const [username, setUsername] = useState(()=> {
		const storedUsername = localStorage.getItem("user");
		return storedUsername ? JSON.parse(storedUsername).username : " " ;
	});	
	const [messages, setMessages] = useState([]); 
	const [newMessages, setNewMessages] = useState("");
	useEffect(() => {

		axios.post(`${API_URL}/messages`, {chat})
			.then((response)=>{
				setMessages(response.data);	
				console.log(chat);
				console.log(response.data);
			});
	},[chat]);	
	useEffect(() => {

		socket.emit("joinChat", chat) ;	
		socket.on("newMessage", (msg) => {
			setMessages(prev => [...prev,msg]);	
		});
		return () => socket.off("newMessage");
		
	},[chat]);
	
	const sendMessage = () => {
		if (newMessages === ("")) return ;
		console.log("ID", chat , "sender:" ,username , "messages:" , newMessages);
		const msgData = { friend_id: chat, sender: username , messages: newMessages };
		socket.emit("sendMessage", msgData);
		setNewMessages("");
	}
	return (
		<div className = {styles.chat}> 
			<div className = {styles.message}>
				{messages.map((message) => (
					<div key={message.id} className = {styles.section}>
						<div className = {styles.name}>{message.sender}:  </div>
						<div className={styles.sectionmessage}> 
							<div className={styles.messagecontent}>{message.messages}</div>
						    <div>
							{new Date(message.created_at).toLocaleString("en-US", {
							    year: "numeric",
							    month: "long",
							    day: "numeric",
							    hour: "2-digit",
							    minute: "2-digit",
							    second: "2-digit",
							    timeZoneName: "short",
								})}
						    </div>
						</div>
					</div>
					
				))}
			</div> 
			<div className = {styles.buttonrow}>
				<input type ="text" placeholder = "Type a message" className={styles.bar}  value={newMessages} onChange={(e)=>setNewMessages(e.target.value)}/>
				<button className={styles.button} onClick={sendMessage}> Send </button> 	
			</div>
		</div>
	)
}	 
export default Chat; 

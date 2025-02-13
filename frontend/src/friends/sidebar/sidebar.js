import react, {useState } from "react" ; 
import styles from "./sidebar.module.css";


const Sidebar = ({onSelect}) => {
	return (
		<div className = {styles.sidebar}> 
			<button onClick={()=> onSelect("yourfriend")}  className = {styles.button}> Your Friends </button> 
			<button onClick={()=> onSelect("add")} className = {styles.button}> Add Friend </button> 
			<button onClick={()=> onSelect("pending")} className = {styles.button}> Pending Friends </button> 
		</div>
	)
}
export default Sidebar; 

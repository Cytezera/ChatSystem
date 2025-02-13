import React , { useState, useRef, useEffect} from "react" ; 
import axios from "axios"; 
import styles from "./dashboard.module.css";
import People from "./people/people.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const [isPage , setIsPage ] = useState (true);
	useEffect(() => {	
		if (window.location.pathname === "/"){
			setIsPage(true);
		}else {
			setIsPage(false);
		}
	},[]);
	if (!isPage){
		return;
	}	
		
	return (
		<div>
			<People/>
		</div>	
	);
}
export default Dashboard;

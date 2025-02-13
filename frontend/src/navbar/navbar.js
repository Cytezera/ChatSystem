import { useState,useEffect } from "react" ;
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
	
	const getToken = () => {

		try { 
			return JSON.parse(localStorage.getItem("user")) || {}; 
		} catch (error){
			return {};
		}
	};
	const [username, setUsername] = useState(getToken().username  );
	
	return ( 
		<div className={styles.navbar}>
			<div className= {styles.navbarButtons}> 
				<Link to= "/"><button>Chat</button></Link>
				<Link to= "/friends"><button>Friends</button></Link>
				<Link to= "/profile"><button>{username}</button></Link>
			</div>
		</div>
	)
}
export default Navbar;

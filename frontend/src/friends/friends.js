import React, {useState } from "react" ;
import Sidebar from "./sidebar/sidebar.js";
import PageContent from "./pagecontent/pagecontent.js";
import styles from "./friends.module.css";
const Friend = () => {
	const [selectedContent, setSelectedContent] = useState("yourfriend");
	return (
		<div className = {styles.friends}>
			<Sidebar onSelect={setSelectedContent} />
			<PageContent content={selectedContent} /> 	
		</div>
	);
		
}
export default Friend ; 

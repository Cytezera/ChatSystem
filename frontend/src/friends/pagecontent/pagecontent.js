import YourFriend from "./yourfriend/yourfriend.js"; 
import Add from "./add/add.js";
import Pending from "./pending/pending.js";

const PageContent = ({content}) => {
	switch (content){
		case "yourfriend":
			return <YourFriend/>;
		case "pending":
			return <Pending/>;
		case "add":
			return <Add/>;
		default: 
			return <YourFriend/>;
	}	
};
export default PageContent ;

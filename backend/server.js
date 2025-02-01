require("dotenv").config();
const express = require("express"); 
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD, 
	database: process.env.DB_DATABASE,

	
});

db.connect((err) => {
	if (err){
		console.error("Database unable to connect " , err) ; 
		return; 
	}
	console.log("Database successfully conencted" ) ; 
});

app.post("/login", (req, res) => {
	const { username, password } = req.body ;
	db.query("select * from users where username = (?) AND password = (?) ; " , [username,password] ,(err, result) => {
		res.json({ sucess:true } ) ;
		if (err) {
			res.json({ sucess:true} ) ;
		}else { 
			res.json({ success:true } ) ;
		}	
	});	
});
const PORT = process.env.PORT || 5000; 
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}` ));

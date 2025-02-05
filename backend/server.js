require("dotenv").config();
const express = require("express"); 
const mysql = require("mysql2");
const cors = require("cors");
const { createHash} = require ('crypto'); 

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD, 
	database: process.env.DB_NAME,

	
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
	hashedPassword = createHash('sha256').update(password).digest('hex');
	db.query("select * from users where username = ? AND password = ? ; ", [username, hashedPassword], (err, result )=> {
		if (err) {
			return res.json({ loggedIn: false, message: "SQL Error",error: err  }) ;
		}
		if(result.length > 0 ) {
			res.json( {loggedIn: true , message: "Log In Completed"   }) ;
		}else {
			res.json( {loggedIn: false , message: "Invalid username or password" }); 
		}
	});
});

app.post("/register", (req,res) => {
	const { username,email,password} = req.body ; 
	hashedPassword = createHash('sha256').update(password).digest('hex');
	db.query("Insert into users (username,email,password) values (?,?,?); " , [username,email,hashedPassword], (err, result) => {
		if (err){
			if ( err.code === "ER_DUP_ENTRY") {
				return res.json({ registration: false, message: "Username is already taken" }) ;
			}else {
				return res.json( {registration: false , message: "SQL error" , error: err } ) ; 
			}		
		}
		return res.json( {registration:true });	
	}); 
});
const PORT = process.env.PORT || 5000; 
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}` ));

require("dotenv").config();
const jwt = require("jsonwebtoken");
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
app.post("/pending", (req, res) => {
	const {id} = req.body; 
	const query = "update friends set status = 'accepted' where friend_id = ? ;";
	db.query(query, [id] , (err, results ) => {
		if (err) {
			return res.json({error:err});
		}
	});
});	
app.get("/pending", (req,res) => {
	const {username} = req.query; 
	const query = `Select friend_id, user1 as friend from friends where user2 = ?   and status = 'pending'; `; 
	db.query(query, [username, username, username ] , (err, results) =>{
		if (err) {
			return res.json({error:err});
		}else {
			return res.json(results);
		}
	});
});

app.get ("/people", (req,res) => {
	const {username } = req.query; 
	const query = `Select friend_id, case when user1 = ? then user2 else user1 end as friend from friends where (user1 = ? or user2 = ? ) and status = 'accepted';`;
	db.query( query ,[username,username,username] , (err, results) => { 
		if (err) {
			return res.json({error: err} ) ;
		}else {
			return res.json(results);
		}
	});
});
app.post("/add/addfriend" , (req,res) => {
	const { username, target } = req.body; 
	const query = `insert into friends (user1, user2) values ( ? , ? ); ` ; 
	db.query(query , [username, target] , (err, results ) => {
		if (err) {
			return res.json ({error: err}); 
		}else {
			return;
		}
	});
	
});
app.post("/add", (req,res) => {
	let { username, search } = req.body; 
	search = `%${search}%`;
	const query = `select distinct u.username, coalesce(f.status,'none') as status from users u left join friends f on((f.user1 = u.username and f.user2 = ? ) or  (f.user2 = u.username and f.user1 = ? )) and f.user1 != f.user2  where u.username like ? and u.username != ?  ;` 
	db.query( query, [username, username, search, username] , (err , results) => {
		if (err) {
			return res.json({error:err}); 
		}else {
			return res.json(results);
		}
	});	

});

app.post("/login", (req, res) => {
	const { username, password } = req.body ;
	hashedPassword = createHash('sha256').update(password).digest('hex');
	db.query("select * from users where username = ? AND password = ? ; ", [username, hashedPassword], (err, result )=> {
		if (err) {
			return res.json({ loggedIn: false, message: "SQL Error",error: err  }) ;
		}
		if(result.length > 0 ) {
			const user = result[0];
			const token = jwt.sign(
				{username: user.username},
				process.env.JWT_SECRET_KEY,
				{ expiresIn: '1h' }
			);
			return res.json( {loggedIn: true , message: "Log In Completed" , token: token, user:{ username: user.username}}) ;

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

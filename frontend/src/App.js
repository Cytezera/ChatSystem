
import { Routes ,Route } from "react-router-dom";
import ReactDOM from "react-dom";
import './App.css';
import Login from "./login/login.js"; 
import Register from "./register/register.js";

function App() {
  return (
	<Routes>
		<Route path="/register" element={<Register />} />
		<Route path="/login" element= {<Login/>}/>
	</Routes>
  );
}

export default App;

import React, {useState, useEffect, useRef } from "react" ; 
import axios from "axios"; 
import styles from "./landing.module.css" ; 
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const navigate = useNavigate();
	const toLogin  = () =>	 {
		navigate("/login");	
	}
	const toRegister = () => {
		navigate("/register");
	}
	return (
		<div className ={styles.container}>
			<div className={styles.buttonContainer}>
				<h1 className = {styles.text}> Login </h1>
				<button className = {styles.login} onClick= {toLogin} > Login </button> 
			</div>
			<div classNem ={styles.buttonContainer}>
				<h1 className = {styles.text}> Register </h1>
				<button className = {styles.register} onClick = {toRegister}  > Register </button>
			</div>
		</div>
	);
}
export default Landing;

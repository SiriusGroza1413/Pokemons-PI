import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"

export default function LandingPage(){
    return (
        <>
            <h1 className={styles.greetings}>Welcome to my Pokemon PI</h1>
            <h2 className={styles.greetings}>Made by Sirius</h2>
            <Link to = "/home">
                <button className={styles.button}>Lets go inside!</button>
            </Link>
        </>
    )
}  
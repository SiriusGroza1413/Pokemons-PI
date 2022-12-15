import React from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom"

export default function Card(props){

    return(
            <div className={styles.dataContainer}>
                <h2>{props.name}</h2>
                <div>
                    <img src={props.img} height="130" width="130" alt="PokemonImage"/>
                </div>
                <h4>ATTACK: {props.attack}</h4>
                <div className={styles.containerTypes}>
                    { 
                        props.types.map(t => {
                            return(
                                <div className={styles.types} key={t}>{t.toUpperCase()}</div>
                            )
                        })
                    }
                </div>   
            </div>
    )
}
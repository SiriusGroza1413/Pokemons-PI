import React from 'react';
import { useState, useEffect} from "react"
import { useDispatch, useSelector} from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { createPokemon, getTypes } from "../../redux/actions/index"
import styles from "./Create.module.css"

const Create = () => {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)


    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    let [error, setError] = useState({})

    const [ input, setInput ] = useState({
        name: "",
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    const history = useHistory()



{/* ------------------------------------------------------- VALIDACIONES -------------------------------------------------------- */}
    const validation = (input) => {
        let error = {};
        if (!/^[a-zA-Z\s]*$/.test(input.name) || typeof input.name !== "string" || input.name.length === 0 ||  input.name.length < 3){
                error.name = "Name can not be an empty field, have no numbers and must have at least 3 characters";
            }
        if (input.health < 1 || input.health > 200 ) {
                error.health = "Health can not be 0 or greater than 200"
            }
        if (input.attack < 1 || input.attack > 200 ) {
                error.attack = "Attack can not be 0 or greater than 200";
            }
        if (input.defense < 1 || input.defense > 200 ) {
                error.defense = "Defense can not be 0 or greater than 200";
            }
        if (input.speed < 1 || input.speed > 200 ) {
                error.speed = "Speed can not be 0 or greater than 200";
            }
        if (input.height < 1 || input.height > 200 ) {
                error.height = "Height can not be 0 or greater than 200";
            }
        if (input.weight < 1 || input.weight > 700 ) {
                error.weight = "Weight can not be 0 or greater than 700";
            }
        if (!input.types.length) {
                error.types = "At least one type is required";
            }
        if(input.types.length > 3) {
            error.types = "Only 3 types per Pokemon"
        }

        return error;
    };




{/* ------------------------------------------------------------------------------------------------------------------------------ */}
{/*---------------------------------------------------------- MANEJADORES ---------------------------------------------------------*/}


    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
        setError(validation({
            ...input,
            [e.target.name] : e.target.value
        }))

        
    }


    
    const handleChecked = (e) => {
        if (e.target.checked) {
            setInput({
            ...input,
            types: [...input.types , e.target.value]
            })
            setError(validation({
                ...input,
                types: [...input.types , e.target.value]
            }))
            
        } else if (!e.target.checked) {
            setInput({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
                })
            setError(validation({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            }))    
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPokemon(input))
        alert("Pokemon created succesfully!")
        setInput({
            name: "",
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: []
        })
        history.push("/home")
    }




{/* ------------------------------------------------ RENDERIZADO DE INPUTS Y BOTONES -----------------------------------------------*/}
    return(
        <div className={styles.formContainer}>   
            <Link to="/home">
                <button id={styles.buttonHome}>Back to home</button>
            </Link>

            <div className={styles.inputContainer}>
                <h3>Select your pokemon stats and types</h3>
                <form onSubmit={handleSubmit}>


                    <div id={styles.nameInput}>

                        <label id={styles.label}>Name* </label>
                        <div className={styles.inputError}>
                            <input id={styles.inputN}
                            type="text"
                            maxLength={15}
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            />
                            {error.name && (<h6>{error.name}</h6>)}
                        </div>
                    </div>


                    <div id={styles.nameInput}>
                    <label id={styles.label}>Health </label>
                        <div className={styles.inputError}>
                            <input id={styles.inputN} 
                            type="number"
                            min="0"
                            max="200"
                            value={input.health}
                            name="health"
                            onChange={(e) => handleChange(e)}
                            
                            />
                            {error.health && (
                            <h6>{error.health}</h6>
                            )}
                        </div>
                    </div>


                    <div id={styles.nameInput}>
                    <label id={styles.label}>Attack </label>
                        <div className={styles.inputError}>
                            <input id={styles.inputN}
                            type="number"
                            min="0"
                            max="200"
                            value={input.attack}
                            name="attack"
                            onChange={(e) => handleChange(e)}
                            />
                            {error.attack && (
                            <h6>{error.attack}</h6>
                            )}
                        </div>
                    </div>


                    <div id={styles.nameInput}>
                    <label id={styles.label}>Defense </label>
                        <div className={styles.inputError}>
                            <input id={styles.inputN}
                            type="number"
                            min="0"
                            max="200"
                            value={input.defense}
                            name="defense"
                            onChange={(e) => handleChange(e)}
                            />
                            {error.defense && (
                            <h6>{error.defense}</h6>
                            )}
                        </div>
                    </div>


                    <div id={styles.nameInput}>
                    <label id={styles.label}>Speed </label>
                        <div className={styles.inputError}>
                            <input id={styles.inputN}
                            type="number"
                            min="0"
                            max="200"
                            value={input.speed}
                            name="speed"
                            onChange={(e) => handleChange(e)}
                            />
                            {error.speed && (
                            <h6>{error.speed}</h6>
                            )}
                        </div>
                    </div>


                    <div id={styles.nameInput}>
                    <label id={styles.label}>Height </label>
                        <div className={styles.inputError}>
                            <input id={styles.inputN}
                            type="number"
                            min="0"
                            max="200"
                            value={input.height}
                            name="height"
                            onChange={(e) => handleChange(e)}
                            />
                            {error.height && (
                            <h6>{error.height}</h6>
                            )}
                        </div>
                    </div>


                    <div id={styles.nameInput}>
                    <label id={styles.label}>Weight </label>
                        <div className={styles.inputError}>
                            <input id={styles.inputN}
                            type="number"
                            min="0"
                            max="700"
                            value={input.weight}
                            name="weight"
                            onChange={(e) => handleChange(e)}
                            />
                            {error.weight && (
                            <h6>{error.weight}</h6>
                            )}
                        </div>
                    </div>

                    <div className={styles.typesContainer}>
                        {
                            types?.map(t => {
                                return(
                                <div className={styles.typesDivs} key={t.name}> 
                                    <label>{t.name}</label>
                                    <input
                                        type="checkbox"
                                        value={t.name}
                                        onChange={(e) => handleChecked(e)}
                                    />
                                </div>
                                )
                                })
                        }
                    </div>   
                    {error.types && (
                        <h6>{error.types}</h6>
                    )} 

                <br/>

                    <div>
                        <button
                        type="submit"
                        disabled={Object.entries(error).length ? true : false}
                        >
                        Create Pokemon
                        </button>
                    </div>
                </form>
            </div>
    </div>
    )
}

export default Create
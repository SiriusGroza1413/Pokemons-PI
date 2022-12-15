import React from "react"
import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getPokemonById } from "../../redux/actions/index"
import { cleanDetail } from "../../redux/actions/index"
import styles from "./Detail.module.css"
import pikachuRunning from "../../assets/pikachu-running.gif"


const Detail = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPokemonById(props.match.params.id))
        return () => dispatch(cleanDetail())
    },[dispatch])


    const pokemon = useSelector((state) => state.detail)



    return(
        <div>
            <div className={styles.container}>
                <Link to="/home">
                    <button id={styles.btn}> return to home </button>
                </Link>
                {
                    Object.entries(pokemon).length ?
                    <div className={styles.pokemonCard} >
                        <h2>{pokemon.name}</h2>
                        <div className={styles.imgAndName}>
                            <img src={pokemon.img}alt={pokemon.name} width="230px" height="230px"/>
                        </div>
                        <div className={styles.pokemonInfo}>
                            <h3>Attack: {pokemon.attack}</h3>
                            <h3>Defense: {pokemon.defense}</h3>
                            <h3>Speed: {pokemon.speed}</h3>
                            <h3>Height: {pokemon.height}</h3>
                            <h3>Weight: {pokemon.weight}</h3>
                        </div>
                        <div className={styles.types}>
                            <h3>Types:</h3>
                            {
                                pokemon.types?.map(t => {
                                    return(
                                        <h4>{t}</h4>
                                    )
                                })
                            }
                        </div>
                    </div> : <img src={pikachuRunning}/>
                }
            </div>
        </div>
    )
}


export default Detail
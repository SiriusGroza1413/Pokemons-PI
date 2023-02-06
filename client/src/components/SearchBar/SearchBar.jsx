import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { getPokemonByName } from '../../redux/actions'
import styles from "./SearchBar.module.css"


const SearchBar = ({setCurrentPage}) => {

    const [name, setName ] = useState("")
    const dispatch = useDispatch()


    function handleChangeSearch(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getPokemonByName(name))
        setName("")
        setCurrentPage(1)
    }


    return(
        <div className={styles.searchContainer}>
                <input 
                className={styles.input}
                type="text"
                value={name}
                placeholder="Search a pokemon here"
                onChange={(e) => {handleChangeSearch(e)}}
                />
                <button
                className={styles.button}
                onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar
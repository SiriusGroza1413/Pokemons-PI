import axios from "axios";
import {GET_POKEMONS,
        GET_TYPES,
        ORDER_POKEMONS,
        FILTER_TYPE,
        FILTER_CREATED, 
        GET_POKEMON_BY_NAME, 
        GET_POKEMON_BY_ID, 
        CLEAN_DETAIL} from "../const";



export const getPokemons = () => {
    return function(dispatch){
        const url = "/pokemons"
        axios.get(url)
        .then(response => response.data)
        .then(data => dispatch({
            type: GET_POKEMONS,
            payload: data
        }))
        .catch(error => console.log(error))
    }
}


export const getTypes = () => {
    return function(dispatch){
        const url = "/types"
        axios.get(url)
        .then(response => response.data)
        .then(data => dispatch({
            type: GET_TYPES, 
            payload: data
        }))
        .catch(error => console.log(error))
    }
}


export const filterByType = (payload) =>{
    return {
        type: FILTER_TYPE, 
        payload: payload
    }
}


export const filterCreated = (payload) =>{
    return {
        type: FILTER_CREATED,
        payload: payload
    }
}


export const getPokemonByName = (payload) => {
    return function(dispatch){
        axios.get(`/pokemons?name=${payload}`)
        .then(response => response.data)
        .then(data => dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: data
        }))
        .catch(error => console.log(error))
    }
}


export const getPokemonById = (id) => {
    return function(dispatch){
        axios.get(`/pokemons/${id}`)
        .then(response => response.data)
        .then(data => dispatch({
            type: GET_POKEMON_BY_ID,
            payload: data
        }))
        .catch((error)=> console.log(error))
    }
}


export const orderPokemons = (payload) => {
    return {
        type: ORDER_POKEMONS,
        payload: payload
    }
}


export const createPokemon = (payload) => {
    return function(dispatch){
        let json = axios.post("/pokemons", payload)
    }
}


export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
}

////////////////////////////////////////////////////


//EL REDUCER SERA QUIEN MODIFIQUE EL ESTADO GLOBAL...HARA LA COPIA DEL ESTADO Y Y LO MODIFICARA A TRAVES DE LAS ACCIONS QUE LE LLEGUEN
import { GET_POKEMONS, 
        GET_TYPES, 
        ORDER_POKEMONS,
        FILTER_TYPE, 
        FILTER_CREATED, 
        GET_POKEMON_BY_NAME, 
        GET_POKEMON_BY_ID, 
        CREATE_POKEMON,
        CLEAN_DETAIL } from "../const";



const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}



function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }


        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case ORDER_POKEMONS:
            let sortedArray


            if(action.payload === 'des'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'asc'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'stronger'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.attack > b.attack){
                            return -1;
                        }
                        if(b.attack > a.attack){
                            return 1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'weaker'){
                sortedArray = state.pokemons.sort(function (a, b){
                        if(a.attack > b.attack){
                            return 1;
                        }
                        if(b.attack > a.attack){
                            return -1;
                        }
                        return 0;
                    }) 
            }
            return {
                ...state,
                pokemons: sortedArray
            }  


        case FILTER_TYPE:
            const allPokemonsCopy = state.allPokemons
            const filtered = action.payload === "All" ? allPokemonsCopy : allPokemonsCopy.filter((p) => p.types?.includes(action.payload))
            return{
                ...state,
                pokemons: filtered
            }


        case FILTER_CREATED:
            const allPokemonsCopyTwo = state.allPokemons
            const filteredTwo = action.payload === "createdInDb" ? allPokemonsCopyTwo.filter(p => p.hasOwnProperty("createdInDb")) : allPokemonsCopyTwo.filter(p => !p.createdInDb)
            return {
                ...state,
                pokemons: action.payload === "All" ? allPokemonsCopyTwo : filteredTwo
            }


        case GET_POKEMON_BY_NAME:
        return {
            ...state,
            pokemons: action.payload
        }

        case GET_POKEMON_BY_ID:
            return{
                ...state,
                detail: action.payload
            }


        case CREATE_POKEMON:
            return{
                ...state
            }

        case CLEAN_DETAIL:
            return{
                ...state,
                detail: []
            }

        case "FILTER_ATTACK":
            const allPokemonsCopyThree = state.allPokemons

            const filteredThree = allPokemonsCopyThree.filter(p => p.attack <= 50)

            return{
                ...state,
                pokemons: filteredThree
            }


        default:
            return {...state};
    }
}



export default rootReducer;  // 2 ESTE SERA MI REDUCER, LO EXPORTO PARA QUE EL STORE PUEDA USARLO
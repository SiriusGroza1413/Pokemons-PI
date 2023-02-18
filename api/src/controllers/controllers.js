const axios = require('axios');
const { Pokemon, Type } = require('../db')



/// ME TRAIGO TODOS LOS POKEMONES DE LA API CON LA DATA NECESARIA PARA LA RUTA PRINCIPAL ///
const getPokemonsFromApi = async () => {
    try {
        const firstRequest = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); //primera request al endpoint principal
        //console.log(firstRequest.data.results) //devuelve un array de objetos con los nombres de los pokemon y un link a cada uno
        const pokemonUrl = await firstRequest.data.results.map(ele => axios.get(ele.url))//esto me devuelve un array de promesas
        //console.log(pokemonUrl[0]) //Devulve la primera promesa PENDIENTE del array de promesas 
        const subRequest = await axios.all(pokemonUrl) //resuelvo silmutaneamente todas las promesas pendientes del array
        const pokemonData = await subRequest.map(pokemon => pokemon.data) //accedo a la data NECESARIA de cada uno de los pokemon
        const pokemon = pokemonData.map(p => {
            return {
                id: p.id,
                name: p.name,
                attack: p.stats[1].base_stat,
                img: p.sprites.other.dream_world.front_default,
                types: p.types.map(type => type.type.name)
            };
        })
        return pokemon
    } catch (error) {
        console.log(error)
    }
}


////// ME TRAIGO LOS POKEMONES DE LA BASE DE DATOS CON LA INFO PARA LA RUTA PRINCIPAL //////
const getPokemonsFromDb = async () => {
    const pokemonsInDb = await Pokemon.findAll({
        include: {
            model: Type,
            through: {
                attributes: []
            }
        },
        attributes: ["id", "name", "img", "attack", "createdInDb"],
    })
    return pokemonsInDb.map(p => {
        return {     //esto sirve para no traerme el cacho de info innecesaria de la base de datos :p
            name: p.name.toLowerCase(),
            id: p.id,
            attack: p.attack,
            img: p.img,
            types: p.types.map(t => t.name),
            createdInDb: p.createdInDb,
        }
    })
}



///// TRAER POKEMONES POR ID DE LA API/////
const getPokemonsById = async (id) => {
    const pokemonById = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemonDetail = pokemonById.data
    return {
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        img: pokemonDetail.sprites.other.dream_world.front_default,
        health: pokemonDetail.stats[0].base_stat,
        attack: pokemonDetail.stats[1].base_stat,
        defense: pokemonDetail.stats[2].base_stat,
        speed: pokemonDetail.stats[5].base_stat,
        height: pokemonDetail.height,
        weight: pokemonDetail.weight,
        types: pokemonDetail.types.map(t => t.type.name),
    }
}


////// TRAER POKEMON POR ID (ID UUID) //////

const getPokemonsFromDbById = async (superId) => {

    try {
        const pokemonDb = await Pokemon.findByPk(superId, {
            include: {
                model: Type,
                through: {
                    attributes: []
                }
            },
            attributes: ["id", "name", "img", "health", "attack", "defense", "speed", "height", "weight", "createdInDb"]
        })
        return {
        id: pokemonDb.id,
        name: pokemonDb.name,
        img: pokemonDb.img,
        health: pokemonDb.health,
        attack: pokemonDb.attack,
        defense: pokemonDb.defense,
        speed: pokemonDb.speed,
        height: pokemonDb.height,
        weight: pokemonDb.weight,
        types: pokemonDb.types.map(t => t.name),
        }
    } catch (error) {
        console.log(error)
    }
    
}


/// TRAE LOS TIPOS DE POKEMONES DE LA API Y LO GUARDA EN LA BASE DE DATOS,
/// O SE LOS TRAE DE LA BASE DE DATOS EN CASO DE QUE YA HAYA SIN VOLVER A HACER LA REQUEST ///
const getPokemonsTypes = async () => {
    try { 
        const thereAreTypes = await Type.findAll()

        if (!thereAreTypes.length) {
            const typesEndpoint = await axios.get('https://pokeapi.co/api/v2/type')
            const info = typesEndpoint.data.results.map(type => type.name)
            info.forEach(type => {
                Type.findOrCreate({
                    where: {name: type}
                })
            })
            
            const bringTypesInDb = await Type.findAll()
            //console.log(bringTypesInDb)
            return bringTypesInDb

        } else {
            return thereAreTypes
        }

    } catch (error) {
        console.log(error)
    }
}


/// Funcion que va a crear un pokemon en la base de datos (recibira los paramatros por body en la ruta post)
const createPokemon = async (pokemonData) => {

    const {name, health, attack, defense, speed, height, weight, img, createdInDb, types} = pokemonData

    const newPokemon = await Pokemon.create({
        name,
        health,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        createdInDb,
    })
    const addTypesInDb = await Type.findAll({
        where: {name: types}
    })

    newPokemon.addType(addTypesInDb)

    return newPokemon
}



module.exports = {
    getPokemonsFromApi,
    getPokemonsFromDb,
    getPokemonsById,
    getPokemonsFromDbById,
    createPokemon,
    getPokemonsTypes,
}

const { Router } = require('express');
const router = Router();
const { getPokemonsFromApi,
        getPokemonsFromDb,
        getPokemonsById,
        getPokemonsFromDbById,
        createPokemon } = require('../controllers/controllers')

const {Pokemon} = require("../db")


// GET /pokemons y GET /pokemons?name=bulbasaur                       ITS WORKING, well.. half

// Debe devolver solo los datos necesarios para la RUTA PRINCIPAL (debe devolver pokemones de la api y de la db)
router.get('/', async (req, res) => {
    try {
        const { name } = req.query
        const pokemonsInApi = await getPokemonsFromApi()
        const pokemonsInDb = await getPokemonsFromDb()
        var allPokemons = pokemonsInApi.concat(pokemonsInDb)

        if (name) {
            const pokemonName = await allPokemons.filter(p => p.name.toLowerCase() === name.toLowerCase())

            if(pokemonName){
                return res.status(200).send(pokemonName)
            } else {
                return res.status(404).send("No se encontro el pokemon pasado por query")
            }
        } else {
            return res.status(200).send(allPokemons)
        }
    } catch (error) {
        res.status(404).send(error) 
    }
})


// GET /pokemons/:id debe traer solo un pokemon con sus detalles tanto de la api como de la base de datos
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
    
        if(id.length <= 2){
            const pokemonApi = await getPokemonsById(id)
            if(pokemonApi){
                return res.status(200).send(pokemonApi)
            } else return res.status(404).send("no se encontro el pokemon en la api")
        } 
        if (id.length > 30){
            const pokemonDb = await getPokemonsFromDbById(id)
            if(pokemonDb){
                return res.status(200).send(pokemonDb)
            } else return res.status(404).send("no se encontro el pokemon en la base de datos")
        } else {
            return res.status(404).send("no se proporciono un id valido")
        }
    
    } catch (error) {
        console.log(error)
    }
})


// POST /pokemon para crear un pokemon en la base de datos con su tipoy devolverlo en la RUTA PRINCIPAL
router.post("/", async (req, res) => {
    try {
        const newPokemon = { name, health, attack, defense, speed, height, weigth, types, createdInDb } = req.body;

        const created = await createPokemon(newPokemon)
        return res.status(201).send(created)

    } catch (error) {
        console.log(error)
    }
})





module.exports = router;
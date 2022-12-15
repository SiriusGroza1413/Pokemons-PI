const { Router } = require('express');
const router = Router()
const { getPokemonsTypes } = require('../controllers/controllers')


router.get('/', async (req, res) => {
    try {
        const infoTypes = await getPokemonsTypes()
        res.status(200).send(infoTypes)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
const db = require('../data/helpers/user-helpers');
const router = require("express").Router();

router.get('/', (req,res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err =>{
        res.status(500).json({Message: "sorry bud"})
    })
})

router.get('/:id', (req,res) => {
    const id = req.params.id

    db.getSpecificUser(id)
    .then(user => {
        res.status(200).json(user)
    })
})

module.exports = router;
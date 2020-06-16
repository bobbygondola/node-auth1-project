//declare stuff
const bcryptjs = require("bcryptjs"); //install this
const router = require("express").Router();
const db = require('../data/helpers/user-helpers')

//register and login and logout
router.post("/register", (req, res) => {
    // validate the body, to make sure there is a username and password.
    const { username, password } = req.body;
    // hash user passwordjs
    const rounds = process.env.HASH_ROUNDS || 8; // change to a higher number in production
    const hash = bcryptjs.hashSync(password, rounds);
    db.addUser({ username, password: hash })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => res.send(err));
  });

router.post("/login", (req, res) => {
    // validate the body, to make sure there is a username and password.
    const { username, password } = req.body;
    // verify user password
    db.findBy({ username })
      .then(([user]) => {
          console.log(user)
          if (user && bcryptjs.compareSync(password, user.password)) {
              req.session.user = { id: user.id, username: user.username }
            res.status(200).json({welcome: user.username, session: req.session});
          } else {
              res.status(401).json({message: "you can not pass!!!"})
          }
        
      })
      .catch(err => res.send(err));
  });

  router.delete("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if(error){
                res.status(500).json({message: "couldnt log out"});
            } else {
                res.status(204).end();
            }
        })
    } else {
        res.status(204).end();
    }
})

module.exports = router;
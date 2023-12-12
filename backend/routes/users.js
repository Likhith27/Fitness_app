// const router = require('express').Router();
// let User = require('../models/user.model');

// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//   const username = req.body.username;
  
//   const newUser = new User({username});
  
//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
//   console.log(res)
// });

// module.exports = router;


const router = require('express').Router();
//const logger = require('your-logger-library'); // Import or configure your logger library
let User = require('../models/user.model');
const logger=require('../logger/logging')



router.route('/').get((req, res) => {
  logger.info('GET /users');
  User.find()
    .then(users => {
      logger.info('Users found:', users);
      res.json(users);
    })
    .catch(err => {
      logger.error('Error fetching users:', err);
      res.status(400).json('Error: ' + err);
    });
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  logger.info(`POST /users/add - Adding user: ${username}`);
  
  const newUser = new User({username});
  
  newUser.save()
    .then(() => {
      logger.info('User added!');
      res.json('User added!');
    })
    .catch(err => {
      logger.error('Error adding user:', err);
      res.status(400).json('Error: ' + err);
    });
});

module.exports = router;


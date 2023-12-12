


// const router = require('express').Router();
// let Exercise = require('../models/exercise.model');

// router.route('/').get((req, res) => {
//   Exercise.find()
//     .then(exercises => res.json(exercises))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//   const username = req.body.username;
//   const description = req.body.description;
//   const duration = Number(req.body.duration);
//   const date = Date.parse(req.body.date);

//   const newExercise = new Exercise({
//     username,
//     description,
//     duration,
//     date,
//   }); data, duration username, 

//   newExercise.save()
//   .then(() => res.json('Exercise added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/:id) .get ((req,res))
// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;




//const logger=require('../logger/logging')



const router = require('express').Router();
//const logger = require('your-logger-library'); // Import or configure your logger library

let Exercise = require('../models/exercise.model');
const logger=require('../logger/logging')




router.route('/').get((req, res) => {
  logger.info('GET /exercises');
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => {
      logger.error('Error fetching exercises:', err);
      res.status(400).json('Error: ' + err);
    });
});

router.route('/add').post((req, res) => {
  logger.info('POST /exercises/add');
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
    .then(() => {
      logger.info('Exercise added!');
      res.json('Exercise added!');
    })
    .catch(err => {
      logger.error('Error adding exercise:', err);
      res.status(400).json('Error: ' + err);
    });
});

router.route('/:id').get((req, res) => {
  const exerciseId = req.params.id;
  logger.info(`GET /exercises/${exerciseId}`);
  Exercise.findById(exerciseId)
    .then(exercise => {
      logger.info('Exercise found:', exercise);
      res.json(exercise);
    })
    .catch(err => {
      logger.error('Error fetching exercise:', err);
      res.status(400).json('Error: ' + err);
    });
});

router.route('/:id').delete((req, res) => {
  const exerciseId = req.params.id;
  logger.info(`DELETE /exercises/${exerciseId}`);
  Exercise.findByIdAndDelete(exerciseId)
    .then(() => {
      logger.info('Exercise deleted.');
      res.json('Exercise deleted.');
    })
    .catch(err => {
      logger.error('Error deleting exercise:', err);
      res.status(400).json('Error: ' + err);
    });
});

router.route('/update/:id').post((req, res) => {
  const exerciseId = req.params.id;
  logger.info(`POST /exercises/update/${exerciseId}`);
  Exercise.findById(exerciseId)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => {
          logger.info('Exercise updated!');
          res.json('Exercise updated!');
        })
        .catch(err => {
          logger.error('Error updating exercise:', err);
          res.status(400).json('Error: ' + err);
        });
    })
    .catch(err => {
      logger.error('Error finding exercise for update:', err);
      res.status(400).json('Error: ' + err);
    });
});

module.exports = router;


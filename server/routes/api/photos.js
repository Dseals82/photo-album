"use strict";
// routes/api/photos.js
const express = require('express');
const router = express.Router();

router.use((req, res, next)=> {
  console.log(req.url, "@", Date.now());
  next();
})
// Load Albums model
const Album = require('../../models/Album');


// @route GET /photos/test
// @description tests photos route
// @access Public
//router.get('/test', (req, res) => res.send('photo route testing!'));

// @route GET /photos
// @description Get all photo entries
// @access Public
router.get('/', (req, res) => {
  Album.find()
    .then(photos => res.json(photos))
    .catch(err => res.status(404).json({ error: 'No photos found' }));
});

// @route GET /photos/:id
// @description Get single photo by id
// @access Public
router.get('/:id', (req, res) => {
    Album.findById(req.params.id)
    .then(photo => res.json(photo))
    .catch(err => res.status(404).json({ error: 'No photo found' }));
});

// @route GET /photos
// @description add/save photo
// @access Public
router.post('/', (req, res) => {
    Album.create(req.body)
    .then(book => res.json({ msg: 'Photo added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this photo' }));
});

// @route GET /photos/:id
// @description Update photo
// @access Public
router.put('/:id', (req, res) => {
    Album.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET /photos/:id
// @description Delete photo by id
// @access Public
router.delete('/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, req.body)
    .then(photo => res.json({ mgs: 'photo entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a photo' }));
});

module.exports = router;
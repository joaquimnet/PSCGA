const express = require('express');

const router = express.Router();

const controller = require('../controllers').user;

// router.get('/:id', controller.get_hug);
// router.post('/', controller.post_hug);
// router.post('/', express.json(), controller.post_hug);
router.get('/login', controller.get_login);
router.get('/logout', controller.get_logout);
router.get('/profile/:id', controller.get_profile_specific);
router.get('/profile', controller.get_profile);

module.exports = router;

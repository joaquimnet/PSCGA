const express = require('express');

const router = express.Router();

const controller = require('../controllers').lecture;

router.get('/api/lecture/:moduleId', express.json(), controller.list_lectures);
router.get('/api/lecture/:id', express.json(), controller.get_lecture);
router.post('/api/lecture/', express.json(), controller.post_lecture);
router.patch('/api/lecture/:id', express.json(), controller.patch_lecture);
router.delete('/api/lecture/:id', express.json(), controller.delete_lecture);

router.get('/lecture/create', controller.get_lecture_editor);
router.get('/lecture/:id', controller.get_lecture_view);

module.exports = router;

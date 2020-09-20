const express = require('express');

const router = express.Router();

const controller = require('../controllers').course;

router.get('/api/course/', express.json(), controller.list_courses);
router.get('/api/course/:id', express.json(), controller.get_course);
router.post('/api/course/', express.json(), controller.post_course);
router.patch('/api/course/:id', express.json(), controller.patch_course);
router.delete('/api/course/:id', express.json(), controller.delete_course);

router.get('/course/create', controller.get_course_editor);
router.get('/course/:id', controller.get_course_view);

module.exports = router;

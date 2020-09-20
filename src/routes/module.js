const express = require('express');

const router = express.Router();

const controller = require('../controllers').module;

router.get('/api/modules/:courseId', express.json(), controller.list_modules);
router.get('/api/module/:id', express.json(), controller.get_module);
router.post('/api/module/', express.json(), controller.post_module);
router.patch('/api/module/:id', express.json(), controller.patch_module);
router.delete('/api/module/:id', express.json(), controller.delete_module);

router.get('/module/create', controller.get_module_editor);
router.get('/module/:id', controller.get_module_view);

module.exports = router;

const { sanitize } = require('../util');
const { Module, Course } = require('../models');

exports.get_module_editor = (req, res) => {
  res.render('create-module');
};

exports.get_module_view = async (req, res) => {
  const { id } = req.params;
  const module = await Module.byId(id);
  res.render('module', { module, content: sanitize(module.description) });
};

exports.list_modules = async (req, res) => {
  const { courseId } = req.params;
  try {
    const modules = await Module.find({ courseId });
    res.json(modules);
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      res.json([]);
    }
  }
};

exports.get_module = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    res.json(module);
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      res.json(null);
    }
  }
};

exports.post_module = async (req, res) => {
  const { courseId, name, description } = req.body;
  if (!courseId || !name || !description) {
    return res.status(401).send({ error: 'courseId, name and description are required' });
  }
  if (!(await Course.byId(courseId))) {
    return res.status(401).send({ error: 'Module not found' });
  }
  const lecture = new Module({ courseId, name, description });
  await lecture.save();
  res.json(lecture);
};

exports.patch_module = async (req, res) => {
  const { courseId, name, description } = req.body;

  const module = await Module.byId(req.params.id);
  if (!module) {
    return res.status(404).send({ error: 'Module not found' });
  }

  if (courseId) module.courseId = courseId;
  if (name) module.name = name;
  if (description) module.description = description;

  await module.save();
  res.json(module);
};

exports.delete_module = async (req, res) => {
  const { id } = req.params;

  const result = await Module.deleteOne({ _id: id });
  res.json(result);
};

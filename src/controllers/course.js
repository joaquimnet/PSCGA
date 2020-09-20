const { sanitize } = require('../util');
const { Course } = require('../models');

exports.get_course_editor = (req, res) => {
  res.render('create-course');
};

exports.get_course_view = async (req, res) => {
  const { id } = req.params;
  const course = await Course.byId(id);
  res.render('course', { course, content: sanitize(course?.description) });
};

exports.list_courses = async (req, res) => {
  res.json(await Course.find({}).exec());
};

exports.get_course = async (req, res) => {
  const course = await Course.byId(req.params.id);
  res.json(course);
};

exports.post_course = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(401).send({ error: 'name and description are required' });
  }

  const course = new Course({ name, description });
  await course.save();
  res.json(course);
};

exports.patch_course = async (req, res) => {
  const { name, description } = req.body;

  const course = await Course.byId(req.params.id);
  if (!course) {
    return res.status(404).send({ error: 'Course not found' });
  }

  if (name) course.name = name;
  if (description) course.description = description;

  await course.save();
  res.json(course);
};

exports.delete_course = async (req, res) => {
  const { id } = req.params;

  const result = await Course.deleteOne({ _id: id });
  res.json(result);
};

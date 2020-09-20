const sanitize = require('sanitize-html');
const { Lecture, Module } = require('../models');

exports.get_lecture_editor = (req, res) => {
  res.render('create-lecture');
};

exports.get_lecture_view = async (req, res) => {
  const { id } = req.params;
  const lecture = await Lecture.byId(id);
  res.render('lecture', {
    lecture,
    content: sanitize(lecture.content, {
      allowedTags: sanitize.defaults.allowedTags.concat(['img', 'span']),
      allowedAttributes: {
        ...sanitize.defaults.allowedAttributes,
        '*': ['style'],
      },
      allowedStyles: {
        '*': {
          // Match HEX and RGB
          color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/],
          // Match any number with px, em, or %
          'font-size': [/^\d+(?:px|em|%)$/],
          width: [/^\d+(?:px|em|%)$/],
          height: [/^\d+(?:px|em|%)$/],
        },
        p: {
          'font-size': [/^\d+rem$/],
        },
      },
    }),
  });
};

exports.list_lectures = async (req, res) => {
  const { moduleId } = req.params;
  try {
    const lectures = await Lecture.find({ moduleId });
    res.json(lectures);
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      res.json([]);
    }
  }
};

exports.get_lecture = async (req, res) => {
  try {
    const user = await Lecture.findById(req.params.id);
    res.json(user);
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      res.json(null);
    }
  }
};

exports.post_lecture = async (req, res) => {
  const { moduleId, title, content } = req.body;
  if (!moduleId || !title || !content) {
    return res.status(401).send({ error: 'moduleId, title and content are required' });
  }
  if (!(await Module.byId(moduleId))) {
    return res.status(401).send({ error: 'Module not found' });
  }
  const lecture = new Lecture({ moduleId, title, content });
  await lecture.save();
  res.json(lecture);
};

exports.patch_lecture = async (req, res) => {
  const { moduleId, title, content } = req.body;

  const lecture = await Lecture.byId(req.params.id);
  if (!lecture) {
    return res.status(404).send({ error: 'Lecture not found' });
  }

  if (moduleId) lecture.moduleId = moduleId;
  if (title) lecture.title = title;
  if (content) lecture.content = content;

  await lecture.save();
  res.json(lecture);
};

exports.delete_lecture = async (req, res) => {
  const { id } = req.params;

  const result = await Lecture.deleteOne({ _id: id });
  res.json(result);
};
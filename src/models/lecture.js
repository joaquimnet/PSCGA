const { Schema, model, SchemaTypes } = require('mongoose');

const schema = new Schema(
  {
    moduleId: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    grouping: {
      type: String,
      required: true,
      default: 'TBD-101',
    },
  },
  { timestamps: true },
);

schema.statics.byId = async function byId(id) {
  const Model = model('Lecture');
  try {
    const doc = await Model.findById(id);
    return doc;
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      return null;
    }
  }
};

module.exports = model('Lecture', schema);

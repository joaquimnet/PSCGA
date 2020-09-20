const { Schema, model, SchemaTypes } = require('mongoose');

const schema = new Schema(
  {
    courseId: {
      type: SchemaTypes.ObjectId,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

schema.statics.byId = async function byId(id) {
  const Model = model('Module');
  try {
    const doc = await Model.findById(id);
    return doc;
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      return null;
    }
  }
};

module.exports = model('Module', schema);

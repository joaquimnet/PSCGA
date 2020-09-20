const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
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
  const Model = model('Course');
  try {
    const doc = await Model.findById(id);
    return doc;
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      return null;
    }
  }
};

module.exports = model('Course', schema);

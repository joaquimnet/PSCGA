const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 32,
    },
    discordId: {
      type: String,
      required: false,
      unique: true,
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
    },
  },
  { timestamps: true },
);

schema.statics.byId = async function byId(id) {
  const Model = model('User');
  try {
    const doc = await Model.findById(id);
    return doc;
  } catch (err) {
    if (err.message.match(/Cast to ObjectId/)) {
      return null;
    }
  }
};

module.exports = model('User', schema);

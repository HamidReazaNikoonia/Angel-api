const mongoose = require('mongoose');

/**
 * Transaction Schema
 * @private
 */
const DreamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
    images: {
      type: [mongoose.Types.ObjectId],
      ref: 'Upload',
      autopopulate: true,
    },
    angels: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
    },
    name_of_owner: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    Progress_of_donation: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

DreamSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Dream', DreamSchema);

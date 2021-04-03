const mongoose = require('mongoose');

/**
 * Transaction Schema
 * @private
 */
const OrgSchema = new mongoose.Schema(
  {
    name_of_org: {
      type: String,
      required: true,
    },
    name_of_manager: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    tell: {
      type: String,
      required: true,
    },
    manager_mobile_number: {
      type: String,
      required: true,
    },
    certificate: {
      type: mongoose.Types.ObjectId,
      ref: 'Upload',
    },
    manager_id_card_scan: {
      type: mongoose.Types.ObjectId,
      ref: 'Upload',
    },
    address: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  },
);

OrgSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Org', OrgSchema);

const Joi = require('joi');

module.exports = {

  // POST /v1/dream
  createDream: {
    body: {
      name_of_owner: Joi.string().required(),
    },
  },


  // PUT /v1/dream
  updateDream: {
    body: {
      name_of_owner: Joi.string().required(),
    },
  },
};

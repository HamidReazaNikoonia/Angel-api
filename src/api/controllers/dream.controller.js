const httpStatus = require('http-status');
const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
// const NoteBooks = require('../models/noteBooks.model');
const Dream = require('../models/dream.model');


exports.get = async (req, res, next) => {
  try {
    const { dreamId } = req.params;
    let dreams = [];

    if (!dreamId) {
      dreams = await Dream.find();
    } else {
      // check for validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(dreamId)) {
        throw new APIError({
          message: 'Dream Not Found',
          isPublic: true,
          status: httpStatus.NOT_FOUND,
        });
      }


      dreams = await Dream.find({ _id: dreamId });
    }


    if (!dreams) {
      throw new APIError({
        message: 'Note can not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    // GG
    res.status(httpStatus.OK);
    res.json({
      data: dreams,
    });
  } catch (err) {
    next(err);
  }
};


exports.getDreamsOf = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let dreams = [];

    if (!userId) {
      dreams = await Dream.find({ user: userId });
    }

    if (!dreams) {
      throw new APIError({
        message: 'Dreams can not Exist',
        status: httpStatus.NOT_FOUND,
      });
    }

    // GG
    res.status(httpStatus.OK);
    res.json({
      data: dreams,
    });
  } catch (err) {
    next(err);
  }
};


exports.create = async (req, res, next) => {
  try {
    const newDream = await new Dream(req.body).save();

    if (!newDream) {
      throw new APIError({
        message: 'Dream can not save',
        status: httpStatus.BAD_REQUEST,
      });
    }

    res.status(httpStatus.CREATED);
    res.json({
      data: newDream,
    });
  } catch (e) {
    next(e);
  }
};


exports.update = async (req, res, next) => {
  try {
    const { dreamId } = req.params;

    // check for validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(dreamId)) {
      throw new APIError({
        message: 'Dream id Not Exist',
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }

    const dream = await Dream.findById(dreamId.toString());

    if (!dream) {
      throw new APIError({
        message: 'Dream can not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const requestData = {
      title: req.body.title || (dream.title || ''),
      detail: req.body.detail || (dream.detail || ''),
    };

    dream.set(requestData);

    const newDream = await dream.save();

    res.status(httpStatus.OK);
    res.json({
      data: newDream,
    });
  } catch (e) {
    next(e);
  }
};


exports.delete = async (req, res, next) => {
  try {
    const { dreamId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dreamId)) {
      throw new APIError({
        message: 'dream Id Not Exist',
        isPublic: true,
        status: httpStatus.NOT_FOUND,
      });
    }


    await Dream.deleteOne({ _id: dreamId.toString() });


    res.status(httpStatus.NO_CONTENT);
    res.json({
      data: [],
    });
  } catch (e) {
    next(e);
  }
};

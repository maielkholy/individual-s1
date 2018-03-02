var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  mai = mongoose.model('mai');

module.exports.getmai = function(req, res, next) {
  if (!Validations.isObjectId(req.params.maiId)) {
    return res.status(422).json({
      err: null,
      msg: 'maiId parameter must be a valid ObjectId.',
      data: null
    });
  }
  mai.findById(req.params.maiId).exec(function(err, mai) {
    if (err) {
      return next(err);
    }
    if (!mai) {
      return res
        .status(404)
        .json({ err: null, msg: 'mai not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'mai retrieved successfully.',
      data: mai
    });
  });
};

module.exports.getmais = function(req, res, next) {
  mai.find({}).exec(function(err, mais) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'mais retrieved successfully.',
      data: mais
    });
  });
};

module.exports.getmaisBelowPrice = function(req, res, next) {
  if (!Validations.isNumber(req.params.price)) {
    return res.status(422).json({
      err: null,
      msg: 'price parameter must be a valid number.',
      data: null
    });
  }
  mai.find({
    price: {
      $lt: req.params.price
    }
  }).exec(function(err, mais) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg:
        'mais priced below ' +
        req.params.price +
        ' retrieved successfully.',
      data: mais
    });
  });
};

module.exports.createmai = function(req, res, next) {
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price)&&
    req.body.seller &&
    Validations.isString(req.body.seller)&&
    req.body.component &&
    Validations.isString(req.body.component);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;

  mai.create(req.body, function(err, mai) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'mai was created successfully.',
      data: mai
    });
  });
};

module.exports.updatemai = function(req, res, next) {
  if (!Validations.isObjectId(req.params.maiId)) {
    return res.status(422).json({
      err: null,
      msg: 'maiId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.price &&
    Validations.isNumber(req.body.price);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();

  mai.findByIdAndUpdate(
    req.params.maiId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedmai) {
    if (err) {
      return next(err);
    }
    if (!updatedmai) {
      return res
        .status(404)
        .json({ err: null, msg: 'mai not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'mai was updated successfully.',
      data: updatedmai
    });
  });
};

module.exports.deletemai = function(req, res, next) {
  if (!Validations.isObjectId(req.params.maiId)) {
    return res.status(422).json({
      err: null,
      msg: 'maiId parameter must be a valid ObjectId.',
      data: null
    });
  }
  mai.findByIdAndRemove(req.params.maiId).exec(function(
    err,
    deletedmai
  ) {
    if (err) {
      return next(err);
    }
    if (!deletedmai) {
      return res
        .status(404)
        .json({ err: null, msg: 'mai not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'mai was deleted successfully.',
      data: deletedmai
    });
  });
};

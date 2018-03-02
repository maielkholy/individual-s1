var mongoose = require('mongoose');

var maiSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  sellerName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  comp: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
});

mongoose.model('mai', maiSchema);

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manaCost: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  subtypes: {
    type: [String],
  },
  rarity: {
    type: String,
  },
  set: {
    type: String,
  },
  power: {
    type: Number,
  },
  toughness: {
    type: Number,
  },
  text: {
    type: String,
  },
  colors: {
    type: [String],
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
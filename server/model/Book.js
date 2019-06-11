const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  name: String,
  author: String,
  price: Number,
  count: Number,
  description: String,
});
mongoose.model('Book', bookSchema);
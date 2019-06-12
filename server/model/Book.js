const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  name: String,
  author: String,
  price: Number,
  count: Number,
  description: String
});
bookSchema.index({name: "text", author: "text", description: "text"});
mongoose.model('Book', bookSchema);
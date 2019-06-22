var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../model/Book');
const Book = mongoose.model('Book');

router.get('/books/:offset', function (req, res, next) {
  getBooks(req, res);
});
router.get('/book/:id', function (req, res, next) {
  getBookDetail(req, res);
});
router.put('/book/update', function (req, res, next) {
  updateBookDetail(req, res);
});
router.post('/create', function (req, res, next) {
  let bookObj = {
    name: req.body.name,
    price: req.body.price,
    author: req.body.author,
    count: req.body.count,
    description: req.body.description
  };
  saveBookInfo(res, bookObj);
});
router.get('/search/:query', async function (req, res, next) {
  try {
    let bookInfo = await Book.find({$text:{$search: req.params.query}});
    res.send(bookInfo);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
async function getBooks(req, res) {
  try {
    const offset = req.params.offset;
    const numOfRecords = 7;
    const skips = offset * numOfRecords;
    let allRecords = await Book.find({}).skip(skips).limit(numOfRecords);
    res.send(allRecords);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getBookDetail(req, res) {
  try {
    let bookInfo = await Book.find({_id: req.params.id});
    res.send(bookInfo);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
async function saveBookInfo(res, data) {
  try {
    const book = new Book({
      name: data.name,
      price: data.price,
      author: data.author,
      count: data.count,
      description: data.description
    });
    await book.save();
    res.send({ status: 200, statusText: "SUCCESS" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
async function updateBookDetail(req, res) {
  try {
    const book = req.body.book;
    await Book.updateOne({name: book.name}, {
      name: book.name,
      price: book.price,
      author: book.author,
      count: book.count,
      description: book.description});
    res.send({ status: 200, statusText: "SUCCESS" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports = router;

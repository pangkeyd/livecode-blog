const mongoose = require('mongoose');
const URI = 'mongodb://localhost/hacktivpress_dpangkey'
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

mongoose.connect(URI, { useMongoClient: true })

var blog = new Schema({
  title: String,
  content: String,
  category: String,
  author: String,
  date: String,
  slug: String
})

var Blog = mongoose.model('Blog', blog)

// Get All Data

function getData(head, cb){
  let token = head.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded){
      Blog.find({
        author: decoded.username
      }, (err, blog) => {
        if(!err){
          cb(blog, null)
        }else{
          res.status(200).send(err)
        }
      })
    }else{
      let login = 'Login Dulu!'
      cb(null, login)
    }
  })
}

// Get One Data

function getBlogBySlug(head, params, cb){
  let token = head.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded){
      Blog.find({
        slug: params.slug
      }, (err, blog) => {
        if(!err){
          cb(blog, null)
        }else{
          res.status(200).send(err)
        }
      })
    }else{
      let login = 'Login Dulu!'
      cb(null, login)
    }
  })
}

// Create

function saveBlog(head, body, cb){
  let token = head.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded){
      let title = body.title
      let slug = title.split(' ').join('-')
      let date = new Date()
      let dateStr = date.toDateString()
      let blogSchema = new Blog({
        title: title,
        content: body.content,
        category: body.category,
        author: decoded.username,
        date: dateStr,
        slug: slug
      })
      blogSchema.save((err, blog) => {
        if(!err){
          cb(blog, null)
        }else{
          res.status(200).send(err)
        }
      })
    }else{
      let login = 'Login Dulu!'
      cb(null, login)
    }
  })
}

function updateBlog(head, params, body, cb){
  let token = head.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded){
      Blog.update({
        slug: params.slug
      }, {
        $set: {
          title: body.title,
          content: body.content,
          category: body.category
        }
      }, (err, blog) => {
        if(!err){
          cb(blog, null)
        }else{
          res.status(200).send(err)
        }
      })
    }else{
      let login = 'Login Dulu!'
      cb(null, login)
    }
  })
}

function deleteBlog(head, params, cb){
  let token = head.token
  let decoded = jwt.verify(token, 'secret key', (err, decoded) => {
    if(decoded){
      Blog.remove({
        slug: params.slug
      }, (err) => {
        if(!err){
          let successDelete = 'Berhasil di Delete!'
          cb(successDelete, null)
        }else{
          let failedDelete = 'Tidak berhasil di Delete!'
          cb(null, failedDelete)
        }
      })
    }
  })
}


module.exports = {
  getData,
  getBlogBySlug,
  saveBlog,
  updateBlog,
  deleteBlog
}

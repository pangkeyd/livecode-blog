const mongoose = require('mongoose');
const URI = 'mongodb://localhost/hacktivpress_dpangkey'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./signup')

mongoose.connect(URI, { useMongoClient: true })

function getUser(cb){
  User.User.find({}, (err, user) => {
    if(!err){
      cb(user)
    }else{
      res.status(200).send(err)
    }
  })
}

function signIn(body, cb){
  User.User.find({
    username: body.user
  }, (err, user) => {
    if(!err){
      if(user.length > 0){
        let resPass = bcrypt.compareSync(body.pass, user[0].password)
        if(resPass){
          let obj = {
            id: user[0]._id,
            username: user[0].username
          }
          let token = jwt.sign(obj, 'secret key')
          cb(token, null)
        }else{
          let wrong = 'Username atau Password Salah!'
          cb(null, wrong)
        }
      }else{
        let wrong = 'Username atau Password Salah!'
        cb(null, wrong)
      }
    }else{
      res.status(200).send(err)
    }
  })
}

module.exports = {
  getUser,
  signIn
}

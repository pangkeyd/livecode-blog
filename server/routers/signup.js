const express = require('express');
const router = express.Router()
const User = require('../controllers/signup')

router.get('/', User.getData)

router.get('/email/:email', User.getDataEmail)

router.get('/user/:username', User.getDataUser)

router.post('/', User.saveData)

module.exports = router

const express = require('express');
const router = express.Router()
const Blog = require('../controllers/index')

router.get('/', Blog.getData)

router.get('/:slug', Blog.getDataBySlug)

router.post('/', Blog.saveData)

module.exports = router

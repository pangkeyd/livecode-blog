const express = require('express');
const router = express.Router()
const Blog = require('../controllers/index')

router.get('/', Blog.getData)

router.get('/:slug', Blog.getDataBySlug)

router.post('/', Blog.saveData)

router.put('/:slug', Blog.updateData)

router.delete('/:slug', Blog.deleteData)

module.exports = router

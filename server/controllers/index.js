const blog = require('../models/index')

class Blog {

  static getData(req, res){
    blog.getData(req.headers, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

  static getDataBySlug(req, res){
    blog.getBlogBySlug(req.headers, req.params, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

  static saveData(req, res){
    blog.saveBlog(req.headers, req.body, (result, auth) => {
      if(result){
        res.send(result)
      }else{
        res.send(auth)
      }
    })
  }

}

module.exports = Blog

<template>
  <div class="index_page">
    <navbar/>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-left">
          <a v-if="dataStorage.length == 0" href="#" class="btn btn-primary" data-toggle="modal" data-target="#login">Add Blog</a>
          <a v-else href="#" data-toggle="modal" data-target="#addBlog" class="btn btn-primary">Add Blog</a>

          <!-- Add Blog -->
          <div class="modal fade" id="addBlog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Add Blog</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" placeholder="Title" name="title" v-model="formAddBlog.title" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('title') }" autocomplete="off">
                    <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
                  </div>
                  <div class="form-group">
                    <label for="content">Content</label>
                    <textarea class="form-control" rows="3" placeholder="Content" name="content" v-model="formAddBlog.content" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('content') }"></textarea>
                    <span v-show="errors.has('content')" class="help is-danger">{{ errors.first('content') }}</span>
                  </div>
                  <div class="form-group">
                    <label for="category">Category</label>
                    <input type="text" class="form-control" id="category" placeholder="Category" name="category" v-model="formAddBlog.category" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('category') }" autocomplete="off">
                    <span v-show="errors.has('category')" class="help is-danger">{{ errors.first('category') }}</span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="submitAddBlog($event)">Add Blog</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-left" v-for="dtb in dataBlog">
          <div class="body_blog">
            <router-link :to="{ name: 'blog', params: { slug: dtb.slug } }">
              <h4>{{ dtb.title }}</h4>
            </router-link>
            <p>
              <span>
                <span class="span_title">Category: </span>
                {{ dtb.category }}
              </span>
              <span>
                <span class="span_title">Author: </span>
                {{ dtb.author }}
              </span>
              <span>
                <span class="span_title">Date: </span>
                {{ dtb.date }}
              </span>
              <span>
                <router-link :to="{ name: 'edit_blog', params: { slug: dtb.slug } }">Edit</router-link> |
                <a href="#">Delete</a>
              </span>
            </p>
          </div>
        </div>
        <div class="col-md-12 text-center" v-if="dataBlog.length == 0">
          <h3>Belom ada Blog nya!</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  import JWT from 'jsonwebtoken'

  export default{
    components: {
      'navbar': Navbar
    },
    data: function(){
      return {
        formAddBlog: {
          title: '',
          content: '',
          category: ''
        },
        dataStorage: [],
        dataBlog: []
      }
    },
    methods: {
      submitAddBlog: function(e){
        e.preventDefault()
        this.$validator.validateAll({
          title: this.formAddBlog.title,
          content: this.formAddBlog.content,
          category: this.formAddBlog.category
        })
        if(!this.errors.any()){
          this.$http.post('http://localhost:3123', this.formAddBlog, {
            headers: {
              'token': localStorage.qwerty
            }
          })
          .then(result => {
            alert('Sukses Post Blog!')
            setInterval(() => {
              this.$router.go(this.$router.currentRoute)
            }, 300)
          })
        }
      },
      getStorage: function(){
        if(localStorage.qwerty){
          let decoded = JWT.decode(localStorage.qwerty)
          this.dataStorage.push(decoded)
        }
      },
      getData: function(){
        this.$http.get('http://localhost:3123', {
          headers: {
            'token': localStorage.qwerty
          }
        })
        .then(({body}) => {
          if(body.length > 0){
            body.forEach(r => {
              this.dataBlog.push(r)
            })
          }
        })
      }
    },
    mounted: function(){
      this.getStorage()
      this.getData()
    }
  }
</script>

<style scoped>
  span.help.is-danger {
    color: red;
    font-size: 13px
  }

  .body_blog {
    margin-top: 30px;
    border: 1px solid silver;
    border-radius: 5px;
    padding: 0 10px;
  }

  .body_blog span {
    margin-right: 30px;
  }

  span.span_title {
    margin-right: 0 !important;
    font-style: italic;
    font-size: 12px;
    color: green;
  }
</style>

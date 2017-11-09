<template>
  <div class="edit_blog">
    <navbar/>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-left">
          <router-link to="/" class="btn btn-primary">Back to Home</router-link>
        </div>
      </div>
      <div class="row">
        <div class="container">
          <div class="col-md-12 text-left">
            <form style="margin-top:20px">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" placeholder="Title" name="title" v-model="formEditBlog.title" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('title') }" autocomplete="off">
                <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
              </div>
              <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" rows="3" placeholder="Content" name="content" v-model="formEditBlog.content" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('content') }"></textarea>
                <span v-show="errors.has('content')" class="help is-danger">{{ errors.first('content') }}</span>
              </div>
              <div class="form-group">
                <label for="category">Category</label>
                <input type="text" class="form-control" id="category" placeholder="Category" name="category" v-model="formEditBlog.category" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('category') }" autocomplete="off">
                <span v-show="errors.has('category')" class="help is-danger">{{ errors.first('category') }}</span>
              </div>
              <button class="btn btn-success" @click="updateBlog($event)">Edit Blog</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'

  export default{
    name: 'edit',
    components: {
      'navbar': Navbar
    },
    data: function(){
      return {
        formEditBlog: {
          title: '',
          content: '',
          category: ''
        }
      }
    },
    methods: {
      getDataBySlug: function(){
        this.$http.get('http://localhost:3123/' + this.$route.params.slug, {
          headers: {
            'token': localStorage.qwerty
          }
        })
        .then(({body}) => {
          this.formEditBlog.title = body[0].title
          this.formEditBlog.content = body[0].content
          this.formEditBlog.category = body[0].category
        })
      },
      updateBlog: function(e){
        e.preventDefault()
        this.$validator.validateAll({
          title: this.formEditBlog.title,
          content: this.formEditBlog.content,
          category: this.formEditBlog.category
        })
        if(!this.errors.any()){
          this.$http.put('http://localhost:3123/' + this.$route.params.slug, this.formEditBlog, {
            headers: {
              'token': localStorage.qwerty
            }
          })
          .then(result => {
            alert('Sukses Update Blog!')
            setInterval(() => {
              this.$router.push('/')
            }, 300)
          })
        }
      }
    },
    beforeMount: function(){
      this.getDataBySlug()
    }
  }
</script>

<template>
  <div class="blog_page">
    <navbar></navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-left" v-for="dtb in dataBlog">
          <h3>{{ dtb.title }}</h3>
          <p class="text-success">{{ dtb.date }}</p>
          <p class="text-warning">{{ dtb.author }}</p>
          <p>
            {{ dtb.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'

  export default{
    components: {
      'navbar': Navbar
    },
    data: function(){
      return {
        dataBlog: []
      }
    },
    methods: {
      getBlog: function(){
        this.$http.get('http://localhost:3123/' + this.$route.params.slug, {
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
      this.getBlog()
    }
  }
</script>

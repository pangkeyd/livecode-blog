<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">Brand</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul v-if="!dataStorage[0]" class="nav navbar-nav navbar-right">
          <li><a href="#" data-toggle="modal" data-target="#login">Login</a></li>
          <li><a href="#" data-toggle="modal" data-target="#register">Register</a></li>
        </ul>
        <ul v-if="dataStorage[0]" v-for="dts in dataStorage" class="nav navbar-nav navbar-right">
          <li>
            <p>
              Welcome, <span v-if="dts">{{ dts.username }}</span>,
              <a href="#" @click="logout">Logout</a>
            </p>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->

      <!-- Login -->
      <div class="modal fade text-left" id="login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <form>
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Login</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" id="username" placeholder="Username" name="user" v-model="formLogin.user" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('user') }" autocomplete="off">
                  <span v-show="errors.has('user')" class="help is-danger">{{ errors.first('user') }}</span>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Password" name="pass" v-model="formLogin.pass" v-validate="'required'" :class="{ 'input': true, 'is-danger': errors.has('pass') }">
                  <span v-show="errors.has('pass')" class="help is-danger">{{ errors.first('pass') }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="submitLogin($event)">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Register -->
      <div class="modal fade text-left" id="register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <form>
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Register</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" id="email" placeholder="Email" name="email" v-model="formRegister.email" v-validate="'required|email|email-unique'" :class="{ 'input': true, 'is-danger': errors.has('email') }" autocomplete="off">
                  <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" id="username" placeholder="Username" name="username" v-model="formRegister.user" v-validate="'required|min:6|regex:^[a-zA-Z0-9_]*$|user-unique'" :class="{ 'input': true, 'is-danger': errors.has('username') }" autocomplete="off">
                  <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Password" name="password" v-model="formRegister.pass" v-validate="'required|min:8'" :class="{ 'input': true, 'is-danger': errors.has('password') }">
                  <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input type="password" class="form-control" id="confirmPassword" placeholder="confirmPassword" name="confirmPassword" v-validate="'required|confirmed:password'" :class="{ 'input': true, 'is-danger': errors.has('confirmPassword') }">
                  <span v-show="errors.has('confirmPassword')" class="help is-danger">{{ errors.first('confirmPassword') }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="submitRegister($event)">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  import { Validator } from 'vee-validate'
  import JWT from 'jsonwebtoken'

  export default{
    data() {
      return {
        formRegister: {
          email: '',
          user: '',
          pass: ''
        },
        formLogin: {
          user: '',
          pass: ''
        },
        dataStorage: []
      }
    },
    mounted: function(){
      this.getStorage()
    },
    methods: {
      logout: function(){
        localStorage.clear()
        this.dataStorage.length = 0
        this.$router.go(this.$router.currentRoute)
      },
      getStorage: function(){
        let decoded = JWT.decode(localStorage.qwerty)
        this.dataStorage.push(decoded)
      },
      submitLogin: function(e){
        e.preventDefault()
        this.$validator.validateAll({
          user: this.formLogin.user,
          pass: this.formLogin.pass
        })
        if(!this.errors.any()){
          this.$http.post('http://localhost:3123/signin', this.formLogin)
          .then(({body}) => {
            localStorage.setItem('qwerty', body)
            alert('Sukses Login!')
            setInterval(() => {
              this.$router.go(this.$router.currentRoute)
            }, 300)
          })
        }
      },
      submitRegister: function(e){
        e.preventDefault()
        this.$http.get('http://localhost:3123/signup')
        .then(({body}) => {
          if(body.length > 0){
            this.$validator.validateAll({
              email: this.formRegister.email,
              username: this.formRegister.user,
              password: this.formRegister.pass,
              confirmPassword: this.formRegister.pass
            })
            .then(result => {
              if(result){
                this.$http.post('http://localhost:3123/signup', this.formRegister)
                .then(result => {
                  alert('Sukses Register!')
                  setInterval(() => {
                    this.$router.go(this.$router.currentRoute)
                  }, 300)
                })
              }
            })
          }else{
            if(!this.errors.any()){
              this.$http.post('http://localhost:3123/signup', this.formRegister)
              .then(result => {
                alert('Sukses Register!')
                setInterval(() => {
                  this.$router.go(this.$router.currentRoute)
                }, 300)
              })
            }
          }
        })
      }
    },
    created: function(){
      const emailUnique = value => new Promise((resolve) => {
        this.$http.get('http://localhost:3123/signup/email/' + value)
        .then(({body}) => {
          if(body.length > 0){
            if(value !== body[0].email){
              return resolve({
                valid: true
              })
            }
            return resolve({
              valid: false,
              data: {
                message: `Email ${value} is already used!`
              }
            })
          }else{
            return resolve({
              valid: true
            })
          }
        })
      })

      Validator.extend('email-unique', {
        validate: emailUnique,
        getMessage: (fields, params, data) => data.message
      })

      const userUnique = value => new Promise((resolve) => {
        this.$http.get('http://localhost:3123/signup/user/' + value)
        .then(({body}) => {
          if(body.length > 0){
            if(value !== body[0].username){
              return resolve({
                valid: true
              })
            }
            return resolve({
              valid: false,
              data: {
                message: `Username ${value} is already used!`
              }
            })
          }else{
            return resolve({
              valid: true
            })
          }
        })
      })

      Validator.extend('user-unique', {
        validate: userUnique,
        getMessage: (fields, params, data) => data.message
      })
    }
  }
</script>

<style scoped>
  .navbar {
    border-radius: 0
  }

  span.help.is-danger {
    color: red;
    font-size: 13px;
  }

  .index_page p {
    color: white;
    margin-bottom: 0;
    margin-top: 13px;
  }

  .index_page span {
    font-weight: bold
  }
</style>

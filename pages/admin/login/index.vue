<template>
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin" @submit="submitlogin">
              <div class="form-label-group">
                <label for="inputEmail">Email address or username</label>
                <input type="text" id="inputEmail" v-model="formlogin.usernameoremail" class="form-control" placeholder="Email address" required autofocus>
              </div>

              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" v-model="formlogin.password" class="form-control" placeholder="Password" required>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>


<script>
import axios from 'axios'
const Cookie = process.client ? require('js-cookie') : undefined
import jwt from 'jsonwebtoken'
export default {
  middleware : 'logonauth',
  data(){
    return{
      formlogin : {
        usernameoremail : '',
        password : ''
      }
    }
  },
  methods:{
    submitlogin(e){
      var vm = this;
      e.preventDefault();
      axios.post('https://nuxtcms.herokuapp.com/api/authen/admin/login', { formlogin : this.formlogin }).then((res) => {
        jwt.verify(res.data.token, 'scretkeylogin', (err, authData) => {
          if(err) return false;
          vm.$store.commit('setAuthAdmin', res.data.token);
          vm.$store.commit('afterLoginSuccess', res.data.token);
          Cookie.set('authAdmin', res.data.token);
          this.$router.push('/admin'); 
        });
        
      });
    }
  }
}
</script>

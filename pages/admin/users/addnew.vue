<template>
    <div>
        <b-row>
            <b-col cols="lg-5">
                <b-form>
                    <b-form-group label="Username">
                        <b-form-input size="sm" v-model="formRegister.username" autocomplete="off" name="username" :class="{'is-invalid' : vErrors.first('username')}" v-validate="'required'"></b-form-input>
                        <div class="invalid-feedback">
                            {{ vErrors.first('username') }}
                        </div>
                    </b-form-group>
                    <b-form-group label="Email">
                        <b-form-input size="sm" v-model="formRegister.email" name="email" :class="{'is-invalid' : vErrors.first('email')}" v-validate="'required|email'"></b-form-input>
                        <div class="invalid-feedback">
                            {{ vErrors.first('email') }}
                        </div>
                    </b-form-group>
                    <b-form-group label="First Name">
                        <b-form-input size="sm" v-model="formRegister.firstname" :class="{'is-invalid' : vErrors.first('firstname')}" name="firstname" v-validate="'required'"></b-form-input>
                        <div class="invalid-feedback">
                            {{ vErrors.first('firstname') }}
                        </div>
                    </b-form-group>
                    <b-form-group label="Last Name">
                        <b-form-input size="sm" v-model="formRegister.lastname" :class="{'is-invalid' : vErrors.first('lastname')}" name="lastname" v-validate="'required'"></b-form-input>
                        <div class="invalid-feedback">
                            {{ vErrors.first('lastname') }}
                        </div>
                    </b-form-group>
                    <b-form-group label="Password">
                        <b-form-input size="sm" :type="(showpassword) ? 'text' : 'password'" :class="{'is-invalid' : vErrors.first('password')}" v-model="formRegister.password" name="password" v-validate="'required'"></b-form-input>
                        <div class="invalid-feedback">
                            {{ vErrors.first('password') }}
                        </div>
                    </b-form-group>
                    <label for="">
                        <input type="checkbox" v-model="showpassword">Show password
                    </label><br />
                    <b-button variant="info" size="sm" @click="addnewUSer()">Submit</b-button>
                </b-form>
            </b-col>
        </b-row>
        
    </div>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import axios from 'axios'
Vue.use(VeeValidate);
export default {
    layout: 'admin',
    data(){
        return{
            showpassword: false,
            formRegister:{
                username : '',
                email : '',
                firstname : '',
                lastname : '',
                password : ''
            }
        }
    },
    methods:{
        addnewUSer(){
            this.$validator.validate().then(valid => {
                if (valid) {
                    axios.post('/api/admin/users/addnew', { arg : this.formRegister }).then((res) => {
                        console.log(res);
                    });
                    // axios.post('/api/admin/acf/addnewacf', { field: this.createItemAcf }).then((res) => {
                    //     return this.$router.push('/admin/acf');
                    // });
                }
            });
        }
    }
}
</script>

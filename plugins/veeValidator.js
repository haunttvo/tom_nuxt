import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import vi from 'vee-validate/dist/locale/vi';
Vue.use(VeeValidate,{
  errorBagName: 'vErrors',
  // inject: false
});

Validator.localize('ar', vi);

<template>
    <div>
    <div id="header">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/admin">NavBar</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content"><em>User</em></template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>    
    </div>
    <div class="wrapper">
      <nav id="sidebar" :class="{'active' : collapseSidebar, 'position-relative' : true}">
        <div class="sidebar_header">
          <div class="user-pic">
            <img class="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
              alt="User picture">
          </div>
          <div class="user-info">
            <span class="user-name">Jhon
              <strong>Smith</strong>
            </span>
            <span class="user-role">Administrator</span>
            <span class="user-status">
              <span><i class="fa fa-circle"></i>Online</span>
            </span>
          </div>
        </div>
        <div class="sidebar-header">
            <h6>General</h6>
        </div>
        <ul class="list-unstyled components menu-sidebar-items">
            <!-- router post type -->
            <!-- <pre>{{ $store.state.listCptSidebar }}</pre> -->
            <li class="sidebar-dropdown" v-for=" (cpt, i) in menuCpt" :key="i">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-tachometer-alt"></i>
                  <span>{{ cpt.name }}</span>
                  <span class="badge badge-pill badge-warning">New</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <n-link :to="`/admin/posts/${cpt.slug}`">
                        List {{ cpt.name }}
                      </n-link>
                    </li>
                    <li>
                      <nuxt-link :to="`/admin/posts/${cpt.slug}/addnew`">
                        Add new
                        <span class="badge badge-pill badge-success">Pro</span>
                      </nuxt-link>
                    </li>
                    <template v-if="cpt.child.length > 0">
                      <li v-for="(term, idex) in cpt.child" :key="idex">
                        <nuxt-link :to="`/admin/posts/${cpt.name}/taxonomy/${term._id}`">
                          <span>{{ term.name }}</span>
                        </nuxt-link>
                      </li>
                    </template>
                    
                  </ul>
                </div>
            </li>
            <!-- end router post type -->
            <li class="sidebar-dropdown">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-apple-alt"></i>
                  <span>Apprearance</span>
                  <span class="badge badge-pill badge-danger">2</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <n-link to="/admin/acf">
                        customize
                        <span class="badge badge-pill badge-success">Pro</span>
                      </n-link>
                    </li>
                    <li>
                      <n-link to="/admin/apprearance/menu">
                        Menu
                      </n-link>
                    </li>
                    <li>
                      <n-link to="/admin/acf/addnew">
                        Header
                      </n-link>
                    </li>
                  </ul>
                </div>
            </li>

            <template v-for="(item, idex) in $menusidebar">
                <itemposttype :item="item" :key="`sb${idex}`"></itemposttype>
            </template>
            <!-- media -->
            <!-- <li class="sidebar-dropdown">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-file"></i>
                  <span>Media</span>
                  <span class="badge badge-pill badge-danger">2</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <n-link to="/admin/media">
                        Library
                        <span class="badge badge-pill badge-success">Pro</span>
                      </n-link>
                    </li>
                    <li>
                      <n-link to="/admin/media/addnew">
                        Add new
                      </n-link>
                    </li>
                  </ul>
                </div>
            </li> -->

            <!-- <li class="sidebar-dropdown">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-user"></i>
                  <span>User</span>
                  <span class="badge badge-pill badge-danger">2</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <n-link to="/admin/users">
                        All users
                      </n-link>
                    </li>
                    <li>
                      <n-link to="/admin/users/addnew">
                        Add new
                      </n-link>
                    </li>
                  </ul>
                </div>
            </li> -->

            <li class="sidebar-dropdown">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Ecommerce</span>
                  <span class="badge badge-pill badge-danger">3</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">Product
                        <span class="badge badge-pill badge-success">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">Order</a>
                    </li>
                    <li>
                      <a href="#">Credit Card</a>
                    </li>
                  </ul>
                </div>
            </li>
            <li class="sidebar-dropdown">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-gem"></i>
                  <span>Components</span>
                  <span class="badge badge-pill badge-danger">3</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">General
                        <span class="badge badge-pill badge-success">Pro</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">Panels</a>
                    </li>
                    <li>
                      <a href="#">Tabs</a>
                    </li>
                  </ul>
                </div>
            </li>
            <li class="sidebar-dropdown">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-apple-alt"></i>
                  <span>Custom field</span>
                  <span class="badge badge-pill badge-danger">2</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <n-link to="/admin/acf">
                        List Field
                        <span class="badge badge-pill badge-success">Pro</span>
                      </n-link>
                    </li>
                    <li>
                      <n-link to="/admin/acf/addnew">
                        Add new field
                      </n-link>
                    </li>
                  </ul>
                </div>
            </li>
            <li>
                <n-link to="/admin/cpt">
                  <i class="fa fa-globe"></i>
                  <span>CPT</span>
                </n-link>
            </li>
            <li>
              <n-link to="/admin/taxonomy">
                <i class="fa fa-dice-d20"></i>
                <span>Taxonomy</span>
              </n-link>
            </li>
            <li>
                <n-link to="/admin/kioviet">
                  <i class="fa fa-file"></i>
                  <span>Sync Kioviet</span>
                </n-link>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
            <li @click="logout()">
                <a  href="#">Logout</a>
            </li>
        </ul>
      </nav>
      <div id="content">
          <nav class="navbar navbar-expand-lg navbar-light bg-light mb-2">
            <div class="container-fluid">
                <button type="button" @click="collapseSidebar = !collapseSidebar" id="sidebarCollapse" class="btn btn-info btn-sm">
                    <i class="fas fa-align-left"></i>
                </button>
            </div>
          </nav>
          <!--notification-->
          <notifications></notifications>
          <nuxt/>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import notifications from '~/components/admin/notifications/index';
import itemposttype from '~/components/admin/sidebar/posttype';
const Cookie = process.client ? require('js-cookie') : undefined;
export default {
    head : {
      script: [
        {src : '/scripts/admin/main.js'}
      ]
    },
    middleware : 'authenticatedadmin',
    components : {notifications, itemposttype},
    data(){
        return{
          collapseSidebar: false,
          menuCpt : []
        }
    },
    methods:{
      logout(){
        Cookie.remove('authAdmin');
        this.$store.commit('setAuthAdmin', null);
        this.$router.push('/admin/login');
      }
    },
    created() {
      // console.log(this.$posttype);
      let vm = this;
      axios.get('/api/admin/cpt').then((rs) => {
        var getTerm = rs.data.map((item) => {
          return axios.get(`/api/admin/terms/findterms/${item.slug}`).then((result) => {
            item.child = result.data;
          })
        });
        Promise.all(getTerm).then(() => {
          vm.menuCpt = rs.data
        })
        
      });
    },
    computed: {
      map () {
        return this.$store.state.listCptSidebar;
      }
    },
}
</script>

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
      <nav id="sidebar" :class="{'active' : collapseSidebar}">
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
            <li class="sidebar-dropdown">
                <a class="ls_down" href="javascript:void(0)">
                  <i class="fa fa-tachometer-alt"></i>
                  <span>Posts</span>
                  <span class="badge badge-pill badge-warning">New</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <nuxt-link to="/admin/posts/addnews">
                        Add new
                        <span class="badge badge-pill badge-success">Pro</span>
                      </nuxt-link>
                    </li>
                    <li>
                      <a href="#">Dashboard 2</a>
                    </li>
                    <li>
                      <a href="#">Dashboard 3</a>
                    </li>
                  </ul>
                </div>
            </li>
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
                <a href="#">Contact</a>
            </li>
        </ul>
      </nav>
      <div id="content">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button type="button" @click="collapseSidebar = !collapseSidebar" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                    <span>Toggle Sidebar</span>
                </button>
            </div>
        </nav>
          <nuxt/>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
    head : {
      script: [
        {src : '/scripts/admin/main.js'}
      ]
    },
    data(){
        return{
        collapseSidebar: false
        }
    },
    mounted(){
        // console.log(process.env.baseUrl);
        $('.menu-sidebar-items a.ls_down').click(function(){
            if( $(this).parent().hasClass('active') ){
                $(this).parent().removeClass('active');
                $(this).next('.sidebar-submenu').slideUp(200);
            }else{
                $('.sidebar-dropdown').removeClass('active');
                $(this).parent().addClass('active');
                $(".menu-sidebar-items .sidebar-submenu").slideUp(200);
                $(this).next('.sidebar-submenu').slideDown(200);
            }
        });
    }
}
</script>

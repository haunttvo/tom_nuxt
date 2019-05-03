/** module register post type */
import Vue from 'vue';
var tomcms = {};

tomcms.menusidebar = new Array();

var register_post_type = function(arr){
    tomcms.menusidebar.push(arr);
}

register_post_type({
    name : 'Media',
    singular_name : 'media',
    add_new : 'add_new',
    edit_item : 'edit_item',
    slug : 'media',
    sub_menu : Array(
        {
            name : 'Library',
            singular_name : 'library',
            sub_menu : Array(
                {
                    name : 'child library',
                    singular_name : 'child library'        
                }
            ),
            slug : '/admin/media'
        },
        {
            name : 'Add new',
            singular_name : 'add new',
            slug : '/admin/addnew'
        }
    ),
    icon : 'fa fa-file',
    cap : Array({
        read : true,
        addnew : true,
        edit : true
    })
});

register_post_type({
    name : 'User',
    singular_name : 'user',
    add_new : 'add_new',
    edit_item : 'edit',
    slug : 'user',
    sub_menu : Array(
        {
            name : 'All user',
            singular_name : 'all user',
            slug : '/admin/users'
        },
        {
            name : 'Add new',
            singular_name : 'add new',
            slug : '/admin/users/addnew'
        }
    ),
    icon : 'fa fa-user',
    cap : Array({
        read : true,
        addnew : true,
        edit : true
    })
});

register_post_type({
    name : 'Permission',
    singular_name : 'permission',
    slug : 'permission',
    icon : 'fa fa-dot-circle',
    cap : Array({
        read : true,
        addnew : true,
        edit : true
    })
});


Vue.prototype.$menusidebar = tomcms.menusidebar;    




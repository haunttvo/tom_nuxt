<template>
    <li class="sidebar-dropdown">
        <a :class="{ ls_down : item.hasOwnProperty('sub_menu') && item.sub_menu.length }" href="javascript:void(0)">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
            <span class="badge badge-pill badge-danger">2</span>
        </a>
        <div v-if="item.hasOwnProperty('sub_menu') && item.sub_menu.length > 0" class="sidebar-submenu">
            <ul>
                <li v-for="(child, index) in item.sub_menu" :key="index">
                    <template>
                        <n-link v-show="!child.hasOwnProperty('sub_menu') || child.sub_menu.length == 0" :to="child.slug">
                            {{ child.name }}
                            <span class="badge badge-pill badge-success">Pro</span>
                        </n-link>
                    </template>
                </li>
            </ul>
        </div>
    </li>
</template>

<script>
export default {
    name : 'sidebarmenu',
    props:{
        item : Object
    }
}
</script>


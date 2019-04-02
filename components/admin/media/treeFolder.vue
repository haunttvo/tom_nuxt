<template>
    <div>
        <ul class="tree-item-media">
            <li class="abc" @click="getListImage(items.url)">{{ items.name }}</li>
            <template v-if="items.children.length > 0">
                <template  v-for=" (item, k) in items.children">
                    <tree :items="item" :key="k"></tree>
                </template>
            </template>
            
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name : 'tree',
    props: {
        items: {
            default: Object
        }
    },
    data(){
        return {
            a : '123'
        }
    },
    methods: {
        getListImage(url){
            this.$root.$emit('getUrlDir', url);
        }
    },
}
</script>
<style lang="scss">
.tree-item-media{
    li{
        list-style-type: none;
        cursor: pointer;
    }
}
</style>


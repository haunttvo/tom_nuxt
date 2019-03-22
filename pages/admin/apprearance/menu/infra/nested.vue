<template>
  <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
    <li v-for="el in tasks" :key="el.name">
        <div>
            <p>{{ el.name }}</p>
        </div>
        <nested-draggable :tasks="el.tasks" />
    </li>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable",
};
</script>
<style lang="scss" scoped>
.dragArea {
    // margin-bottom: 10px;
    min-height: 10px;
//   outline: 1px dashed;
    li{
        list-style: none;
        > div{
            // height: 40px;
            padding: 15px 20px;
            margin-top: 4px;
            margin-bottom: 10px;
            p{
                margin-bottom: 0;
            }
            background-color: #F7F7F7; 
            box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.1);
        }
    }
}
</style>
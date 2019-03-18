<template>
    <div>
        <tr>
            <td class="Field Label">Field Label</td>
            <td class="et-form">
                <input type="text" class="form-control form-control-sm">
            </td>
        </tr>
        <tr>
            <td class="Field Label">Field Name</td>
            <td class="et-form">
                <input type="text" class="form-control form-control-sm">
            </td>
        </tr>
        <tr>
            <td class="Field Label">Field Type</td>
            <td class="et-form">
                <input type="text" class="form-control form-control-sm">
            </td>
        </tr>
    </div>
</template>

<script>
export default {
    props:{
        fieldSchema : {
            type : Array,
            default : []
        }
    },
    data(){
        return {

        }
    },
}
</script>


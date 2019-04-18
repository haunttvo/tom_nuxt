<template v-for="(term, idex) in ArrTerms" >
    <tr :key="`asdas${idex}`">
        <td>{{ term.name }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</template>
<script>
export default {
    props : {
        ArrTerms : {
            type: Array
        }
    }
}
</script>
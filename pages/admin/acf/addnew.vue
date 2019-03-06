<template>
    <div>
        <b-form>
            <b-form-group label="Add new field Group">
                <b-form-input placeholder="Enter title here" type="text"></b-form-input>
            </b-form-group>
            <b-table stacked striped hover bordered="" :items="items">
                <template slot="typefield">
                    <p>nguyen thanh hau</p>
                </template>
            </b-table>
        </b-form>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    data(){
        return{
            items: [
                {name: 'Field Label', typefield: ''},
                {name: 'Field Name', typefield: ''},
            ]
        }
    }
}
</script>


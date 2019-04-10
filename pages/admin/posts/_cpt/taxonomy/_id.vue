<template>
    <div>
        <b-row>
            <b-col col lg="4">
                <b-form>
                    <b-form-group label="Name">
                        <b-form-input size="sm" v-model="formAddTerm.name"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Slug">
                        <b-form-input size="sm" v-model="formAddTerm.slug"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Parent">
                        <b-form-select size="sm" v-model="formAddTerm.parentId">

                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Description">
                        <b-form-textarea size="sm" v-model="formAddTerm.description"></b-form-textarea>
                    </b-form-group>
                    <b-button type="button" @click="submitTerms()" size="sm" variant="primary">Add new category</b-button>
                </b-form>
            </b-col>
            <b-col col lg=8>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th width="20"></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Slug</th>
                            <th>Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Red</td>
                            <td>May do</td>
                            <td>red</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    layout: 'admin',
    data() {
        return {
            formAddTerm : {
                name : '',
                parentId : '',
                slug: '',
                description : '',
                termId : this.$route.params.id
            }    
        }
    },
    methods: {
        submitTerms(){
            axios.post('/api/admin/metaterms/addnew', { arg : this.formAddTerm }).then((res) => {
                console.log(res);
            });
        }
    },
}
</script>
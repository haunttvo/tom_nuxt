<template>
    <div>
        <b-row>
            <b-col col lg="12">
                <div class="card p-2">
                    <b-form-group label="Select a menu to edit" label-cols="2">
                        <b-form-select class="w-auto" :options="menuoptions" size="sm"></b-form-select>
                        <b-button size="sm" variant="primary">Select</b-button>
                    </b-form-group>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col col lg="3">
                <div id="accordion-menu-th">
                    <div class="card rounded-0">
                        <div class="card-header" id="headingOne">
                            <h6 data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Pages</h6>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion-menu-th">
                        <div class="card-body">
                            <itemPostType></itemPostType>
                        </div>
                        </div>
                    </div>
                    <div class="card rounded-0">
                        <div class="card-header" id="headingTwo">
                            <h6 data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Custom Links</h6>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion-menu-th">
                        <div class="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        </div>
                    </div>
                    <div class="card rounded-0">
                        <div class="card-header" id="headingThree">
                            <h6 data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Categories</h6>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion-menu-th">
                        <div class="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        </div>
                    </div>
                </div>
            </b-col>
            <b-col col lg="9">
                b
            </b-col>
        </b-row>
    </div>
</template>

<script>
import itemPostType from '~/components/admin/apprearance/menu/itemPostType'
export default {
    layout : 'admin',
    components : {
        itemPostType
    },
    data(){
        return{
            menuoptions : [
                { value: '1', text: 'Main menu' },
                { value: '2', text: 'Footer menu' }
            ]
        }
    }
}
</script>
<template>
    <div>
        <nuxt />
    </div>
</template>

<script>
export default {
    mounted(){
        $('.menu-sidebar-items a.ls_down').click(function(){
            if( $(this).parent().hasClass('active') ){
                $(this).parent().removeClass('active');
                $(this).next('.sidebar-submenu').slideUp(200);
            }else{
                console.log(1);
                $('.menu-sidebar-items').removeClass('active');
                $(this).parent().addClass('active');
                $(".menu-sidebar-items .sidebar-submenu").slideUp(200);
                $(this).next('.sidebar-submenu').slideDown(200);
            }
        });
    }
}
</script>

jQuery(document).ready(function($){
    $(document).on('click', '.bt-toggle-box-tom', function(){
        if($(this).hasClass('rotate-180')){
            $(this).parents('.header-box-tom').addClass('border-bottom-0');
            $(this).removeClass('rotate-180');
        }else{
            $(this).parents('.header-box-tom').removeClass('border-bottom-0');
            $(this).addClass('rotate-180');
        }
        $(this).parents('.box-tom').find('.tb-acf').toggle();
    });
})
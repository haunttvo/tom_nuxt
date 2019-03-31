<!-- Search Box -->
<div class="search-box-wrapper ">
    <div class="search-box-inner">
        <div class="container">
            <div class="search-box map">
                <form role="form"  class="form-map form-search" action="<?php echo home_url( '/' ); ?>" method="GET">
                    <div class="row">
                        <div class="col-md-2 col-sm-4 col-xs-6 col-xs-full">
                            <div class="form-group">
                                <input type="text" class="form-control" id="keyword" name="s" value="" placeholder="Nhập từ cần tìm" />
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 col-xs-full">

                            <div class="form-group">
                                <select id="property_direction" class="property_direction" name="direction">
                                    <option value="">Hướng</option>
                                    <?=get_options_by('direction',$_GET['direction']); ?>
                                </select>
                            </div>
                            
                            <!-- /.form-group -->
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 col-xs-full">
                            <div class="form-group">
                                <select id="property_type" class="property_type" name="type">
                                    <option value="">Thể loại</option>
                                    <?=get_options_by('property_type',$_GET['type']); ?>
                                </select>
                            </div>
                            <!-- /.form-group -->
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 col-xs-full">
                            <div class="form-group">
                                <select id="property_place" class="property_place" name="place">
                                    <option value="">Địa điểm</option>
                                    <?=get_options_by('property_place',$_GET['place']); ?>
                                </select>
                            </div>
                            <!-- /.form-group -->
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 col-xs-full">
                            <div class="form-group">
                                <select id="property_price" class="property_price" name="price">
                                    <option value="">Giá</option>
                                    <?=get_options_by('price',$_GET['price']); ?>
                                </select>
                            </div>
                            <!-- /.form-group -->
                        </div>
                        <div class="col-md-2 col-sm-4 col-xs-6 col-xs-full">
                            <div class="form-group">
                                <button type="submit" class="btn btn-default">Tìm kiếm</button>
                            </div>
                            <!-- /.form-group -->
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
    <div class="background-image">
        <img class="opacity-20" src="<?=THEME_URL_ASSETS;?>/images/searchbox-bg.jpg">
    </div>
</div>
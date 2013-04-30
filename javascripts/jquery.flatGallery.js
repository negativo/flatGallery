(function($){
    $.flatGallery = function(el, data, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("flatGallery", base);
        base.currentPage = 1;
        base.isFullScreen = 0;
        base.elementsPerPageArray = {
            small : 10,
            medium : 8,
            big : 6
        };
        var layout ="";
        var galleryViews = function(){
            return '<div class="displaySelector both cool"> '+
                '<div class="sizeButtons left"> '+
                    '<div class="buttonSmall sizeButton button left" alt="111">Small'+
                        '<svg width="10" height="10" style="padding:8px;"><rect x="0" y="0" width="10" height="10" fill="white" /></svg></div>'+
                    '<div class="buttonMedium sizeButton button left" alt="166">Medium'+
                        '<svg width="13" height="13" style="padding:6px;"><rect x="0" y="0" width="13" height="13" fill="white" /></svg></div>'+
                    '<div class="buttonBig sizeButton button left" alt="226">Big'+
                        '<svg width="15" height="15" style="padding:5px;"><rect x="0" y="0" width="15" height="15" fill="white" /></svg></div>'+
                '</div>'+
                '<div class="itemsPerPage left">'+
                    '<select class="itemsPerPageSelect">'+
                        '<option value="-">items per page</option>'+
                        '<option value="4">4</option>'+
                        '<option value="5">5</option>'+
                        '<option value="6">6</option>'+
                        '<option value="7">7</option>'+
                        '<option value="8">8</option>'+
                        '<option value="9">9</option>'+
                        '<option value="10">10</option>'+
                    '</select>'+
                '</div>'+
                '<div class="viewButtons right">'+
                    '<div class="viewList viewButton button left" alt="list" >List<img src="images/iconList.png" width="18" /></div>'+
                    '<div class="viewThumb viewButton button left" alt="thumb" >Thumb<img src="images/iconThumbs.png" width="18" /></div>'+
                '</div>'+
            '</div>';
        };
        var galleryBody = function() {
            return '<div class="galleryBody"></div>';
        };
        var galleryPaginator = function(){
            return '<div class="galleryPaginator both">'+
                '<div class="pageSelector">'+
                    '<div class="pageFirst button left" alt="first"><<</div>'+
                    '<div class="pagePrevious button left" alt="prev"><</div>'+
                    '<div class="currentPage left"></div>'+
                    '<div class="pageNext button left" alt="next" onclick="javascript:void(0)">></div>'+
                    '<div class="pageLast button left" alt="last">>></div>'+
                '</div>'+
            '</div>';
        };
        var blackBackground = function(){
            return '<div class="blackFullScreen close"  />' ;
        };
        var imageContainer = function(){
            return  '<div class="topbar">'+
                        '<div class="button previousPic arrow"><</div>'+
                        '<div class="button nextPic arrow">></div>'+
                        '<div class="button close">x</div>'+
                    '</div>'+
                    '<div class="imageContainer close" >'+
                        '<img class="bigImage" src="" />'+
                    '</div>';
        };
        base.$el.addClass('rootel')
                .append(galleryViews)
                .append(galleryBody)
                .append(galleryPaginator)
                .append(blackBackground)
                .append(imageContainer);
        base.init = function(){
            base.$el.find('.displaySelector').fadeIn();
            base.$el.find('.galleryPaginator').fadeIn();
            base.options = $.extend({},$.flatGallery.defaultOptions, options);
            base.toggleSizeButtons(base.options.view);
            base.updateCurrentPage();
            base.$el.find('.viewButton').each(function(){
                if($(this).attr('alt')===base.options.view){
                    $(this).addClass('active');
                }
            });
            base.view = base.options.view;
            if(base.view === 'thumb'){
                var thumbSize =  base.options.size.charAt(0).toUpperCase() + base.options.size.slice(1);
                base.$el.find('.button'+thumbSize).trigger('click');
            }
            base.addContent(base.options.view);
        };
        base.currentThumbSize = function(){
            return base.$el.find('.sizeButtons').find('.active').text().toLowerCase();
        };
        base.addContent = function(view,elPerPage){
            if(elPerPage){
                base.options.elementsPerPage = elPerPage;
                base.elementsPerPage = base.options.elementsPerPage ;
            }else{
                base.getElementsPerPage(view);
            }
            base.totalPages = base.getTotalPages();
            base.updateCurrentPage();
            base.$el.find('.galleryBody').hide().html(' ');
            var opt = base.options;
            if(view==='list'){
                base.$el.find('.itemsPerPage').hide();
                base.$el.find('.galleryBody').append('<table class="dataList">'+
                                                        '<tr>'+
                                                            '<th>Filename</th>'+
                                                            '<th>Size</th>'+
                                                            '<th>Mime Type</th>'+
                                                        '</tr>'+
                                                    '</table>');
                for (var i in data){
                    if( i < parseInt((opt.elementsPerPage * base.currentPage),10) && i >= parseInt((opt.elementsPerPage * ( base.currentPage - 1 )),10)){
                        var listElement = base.getListElementHtml(i,data[i]);
                        base.$el.find('.dataList').append(listElement);
                    }
                }
            }else if(view==='thumb'){
                for( var j in data ){
                    if( j < parseInt((opt.elementsPerPage * base.currentPage),10) && j >= parseInt((opt.elementsPerPage * ( base.currentPage - 1 ) ),10)){
                        var thumb = base.getImageElementHtml(data[j].thumb, data[j].size,data[j].file,j);
                        base.$el.find('.galleryBody').append($(thumb));
                    }
                }
                base.$el.find('.galleryBody').find('img').width(base.$el.find('.sizeButtons').find('.active').attr('alt'));
            }
            if(!opt.showSizeButtons){
                base.$el.find('.sizeButtons').hide();
            }
            if(!opt.showViewButtons){
                base.$el.find('.viewButtons').hide();
            }
            if(!opt.showPaginator){
                base.$el.find('.galleryPaginator').hide();
            }
            if(!opt.showItemsPerPage){
                base.$el.find('.itemsPerPage').hide();
            }
            base.$el.find('.galleryBody').fadeIn();
        };
        base.getListElementHtml = function(index, obj){
            var color = (index % 2 === 0) ? "one" : "two";
            return '<tr class="'+color+'"><td>'+obj.file +'</td><td>'+ obj.size +'</td><td>'+ obj.mime +'</td></tr>';
        };
        base.getElementsPerPage = function (view){
            if(view==='list'){
                base.options.elementsPerPage = 14;
                base.elementsPerPage = base.options.elementsPerPage ;
            }else{
                base.options.elementsPerPage =  base.elementsPerPageArray[base.currentThumbSize()];
                base.elementsPerPage = base.options.elementsPerPage ;
            }
        };
        base.getTotalPages = function(){
            return (base.options.elementsPerPage !== 10 ) ? parseInt((data.length / base.options.elementsPerPage) + 1,10) : parseInt(data.length / base.options.elementsPerPage,10);
        };
        base.getImageElementHtml = function(url,size,rel,index){
            return '<div class="thumbImageContainer" style="margin:30px;">'+
                        '<img class="thumbImage" src="'+url+'" alt="'+size+'" data-big="'+rel+'" data-index="'+index+'" />'+
                    '</div>';
        };
        base.updateCurrentPage = function(){
            base.$el.find('.currentPage').html(base.currentPage+'/'+base.totalPages);
        };
        base.picNext = function(){

        };
        base.picPrevious = function(){

        };
        base.closeImage = function(){
            base.isFullScreen = 0;
            base.$el.find('.topbar').hide();
            base.$el.find('.blackFullScreen').hide();
            base.$el.find('.imageContainer').hide();
        };
        base.pageFirst = function(){
            base.$el.find('.pageSelector').find('.button').each(function(){
                if($(this).hasClass('pageFirst')){
                    $(this).trigger('click');
                }
            });
        };
        base.pageLast = function(){
            base.$el.find('.pageSelector').find('.button').each(function(){
                if($(this).hasClass('pageLast')){
                    $(this).trigger('click');
                }
            });
        };
        base.pageNext = function(){
            base.$el.find('.pageSelector').find('.button').each(function(){
                if($(this).hasClass('pageNext')){
                    $(this).trigger('click');
                }
            });
        };
        base.pagePrevious = function(){
             base.$el.find('.pageSelector').find('.button').each(function(){
                    if($(this).hasClass('pagePrevious')){
                        $(this).trigger('click');
                    }
                });
        };
        base.toggleSizeButtons = function(view){
            if(view === 'list'){
                base.$el.find('.sizeButtons').hide();
            }else{
                base.$el.find('.sizeButtons').fadeIn();
            }
        };
        base.$el.find('.pageSelector').delegate('.button','click',function(){
            if($(this).attr('alt')==='next'){
                if(base.currentPage < base.totalPages ){
                    base.currentPage += 1;
                    base.addContent(base.view);
                }
            }else if($(this).attr('alt')==='prev'){
                if(base.currentPage > 1 ){
                    base.currentPage -= 1;
                    base.addContent(base.view);
                }
            }else if($(this).attr('alt')==='first'){
                if(base.currentPage > 1 ){
                    base.currentPage = 1;
                    base.addContent(base.view);
                }
            }else if($(this).attr('alt')==='last'){
                if(base.currentPage < base.totalPages ){
                    base.currentPage = base.totalPages;
                    base.addContent(base.view);
                }
            }
        });
        var margin;
        var imageMargin;
        var thumbSize;

        base.$el.find('.galleryBody').delegate('.thumbImage','click',function(){
            var that = $(this);
            return (function(){
                base.isFullScreen = 1;
                base.$el.find('.blackFullScreen').fadeIn();
                base.$el.find('.imageContainer').fadeIn();
                base.$el.find('.topbar').fadeIn();
                base.$el.find('.imageContainer').find('img').attr('src',that.attr('data-big')).attr('data-index',that.attr('data-index'));
            })();
        }).delegate('.thumbImage','mouseover',function(){
            
        });

        base.$el.delegate('.arrow','click',function(){
            var theImage = base.$el.find('.imageContainer').find('img');
            var index =theImage.attr('data-index');
            var newIndex;
            if($(this).hasClass('previousPic')){
                newIndex = (index > 1) ? index - 1 : data.length - 1 ;
            }else{
                newIndex = (index < data.length - 1 ) ? parseInt(index,10) + 1 : 0 ;
            }
            theImage.attr('src',data[newIndex].file).attr('data-index',newIndex);
            base.$el.find('.imageContainer').find('img');
        });

        base.$el.delegate('.viewButton','click',function(){
            base.view = $(this).attr('alt');
            base.addContent(base.view);
            base.toggleSizeButtons($(this).attr('alt'));
            base.$el.find('.viewButton').removeClass('active');
            $(this).addClass('active');
            base.pageFirst();
        }).delegate('.itemsPerPageSelect','change',function(){
            base.addContent('thumb',$(this).val());
        }).delegate('.sizeButton','click',function(){
            var size=$(this).attr('alt');
            base.$el.find('.galleryBody').find('div').each(function(){
                $(this).width(size+'px').height(size+'px');
            });
            base.options.elementsPerPage = base.getElementsPerPage('thumbs');
            base.toggleSizeButtons($(this).attr('alt'));
            base.$el.find('.sizeButton').removeClass('active');
            $(this).addClass('active');
            base.addContent('thumb');
            base.pageFirst();
            thumbSize = $('.thumbImageContainer').width();
        }).delegate('img.bigImage','click',function(e){
            e.stopPropagation();
            base.$el.find('.nextPic').trigger('click');
        }).delegate('.close','click',function(){
            base.closeImage();
        });
        $(document.documentElement).keyup(function (event) {
            if (event.keyCode == 37) {
                base.pagePrevious();
            }else if (event.keyCode == 39) {
                base.pageNext();
            }
        });
        base.init();
        base.$el.find('.sizeButtons').find('.active').trigger('click');
    };
    $.flatGallery.defaultOptions = {
        view: "thumb",
        size: "medium",
        showSizeButtons: true,
        showViewButtons: true,
        showPaginator: true,
        showItemsPerPage: true,
        elementsPerPage: 8
    };
    $.fn.flatGallery = function(view, options){
        return this.each(function(){
            (new $.flatGallery(this, view, options));
            $this = $(this);
        });
    };
})(jQuery);
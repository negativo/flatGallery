
    $(document).ready(function(){
        var myImages = [];
        $.getJSON("http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=e7e44a4a7906e181bb0407245c48550a&user_id=29096781@N02&per_page=12&page=4&format=json&jsoncallback=?", function(data) {
            var items = [];
            $.each(data, function(key, val) {
                for (var x in val){
                    if($.isArray(val[x])){
                        var value = val[x];
                        for(var i in value){
                            myImages.push({
                                file: 'http://farm'+value[i].farm+'.staticflickr.com/'+value[i].server+'/'+value[i].id+'_'+value[i].secret+'.jpg',
                                thumb: 'http://farm'+value[i].farm+'.staticflickr.com/'+value[i].server+'/'+value[i].id+'_'+value[i].secret+'_t.jpg',
                                size: '800x600',
                                mime: 'image/jpeg'    
                            });
                        }
                    }
                }
            });
            $(".galleryRoot").flatGallery(myImages);
            // shows just the list
            /* $(".galleryRoot").flatGallery(myImages,{ 
                view: "list", 
                showSizeButtons: false, 
                showViewButtons: false
            }); */ 
            
            // show just the gallery, default view is Thumbs
            /*$(".galleryRoot").flatGallery(myImages,{ 
                showSizeButtons: false, 
                showViewButtons: false,
                showItemsPerPage: false,
                elementsPerPage: 10
            }); 
            */

        });
    
        
        
        
    }); 
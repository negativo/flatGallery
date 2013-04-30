<h1>FLAT GALLERY - simple jQuery Gallery with Flat Colors</h1>
<h3>How to use:</h3>
<pre>
	var myImages = [
						...

						{
                            file: 'big image URL',
                            thumb: 'thumb image URL',
                            size: 'image size ',
                            mime: 'image mime type'    
                        }
                        
                        ...

                    ];
	$(element).flatGallery(myImages);
</pre> 

    <h3>shows just the list</h3>
            <pre>
            $(".galleryRoot").flatGallery(myImages,{ 
                view: "list", 
                showSizeButtons: false, 
                showViewButtons: false
            }); 
            </pre>
    <h2>show just the gallery, default view is Thumbs</h2>
        <pre>
            $(".galleryRoot").flatGallery(myImages,{ 
                showSizeButtons: false, 
                showViewButtons: false,
                showItemsPerPage: false,
                elementsPerPage: 10
            }); 
        </pre>
<h3>Example:</h3>
<img src="https://raw.github.com/negativo/flatGallery/master/flatGalleryScreen.png" />
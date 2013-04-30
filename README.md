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
========================================================
<h3>shows just the list</h3>
<pre>
    $(".galleryRoot").flatGallery(myImages,{ 
        view: "list", 
        showSizeButtons: false, 
        showViewButtons: false
    }); 
</pre>
========================================================
<h3>show just the gallery, default view is Thumbs</h3>
<pre>
    $(".galleryRoot").flatGallery(myImages,{ 
        showSizeButtons: false, 
        showViewButtons: false,
        showItemsPerPage: false,
        elementsPerPage: 10
    }); 
</pre>

<h3>First Basic Example:</h3>
<img src="https://raw.github.com/negativo/flatGallery/master/flatGalleryScreen.png" />
========================================================
<h3>to do:</h3>
<ul>
    <li>add touch events </li>
    <li>improve data loading</li>
    <li>improve graphic appearance</li>
    <li>add more themes</li>
    <li>refactor addcontent & init func</li>
</ul>


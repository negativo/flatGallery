<h1>FLAT GALLERY - simple jQuery Gallery with Flat Colors</h1>
<p>
    Hi everyone,
    this is my first code open sourced, 
    enjoy! :)
</p>
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
========================================================
<h3>to do:</h3>
<ul>
    <li>add touch events </li>
    <li>add title & description </li>
    <li>improve data loading</li>
    <li>improve graphic appearance</li>
    <li>add more themes</li>
    <li>refactor addcontent & init func</li>
    <li>replace png files with svg canvas</li>
</ul>


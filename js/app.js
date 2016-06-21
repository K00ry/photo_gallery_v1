// creating a JSON file for the gallery Items

var galleryItems = [{
        "href": "1.jpg",
        "title": "Hay Bales",
        "alt": "I love hay bales. Took this snap on a drive through the countryside past some straw fields."
    },

    {
        "href": "2.jpg",
        "title": "Lake",
        "alt": "The lake was so calm today. We had a great view of the snow on the mountains from here."
    },

    {
        "href": "3.jpg",
        "title": "Canyon",
        "alt": "I hiked to the top of the mountain and got this picture of the canyon and trees below."
    },

    {
        "href": "4.jpg",
        "title": "Iceberg",
        "alt": "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."
    },

    {
        "href": "5.jpg",
        "title": "Desert",
        "alt": "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."
    },

    {
        "href": "6.jpg",
        "title": "Fall",
        "alt": "Fall is coming, I love when the leaves on the trees start to change color."
    },

    {
        "href": "7.jpg",
        "title": "Plantation",
        "alt": "I drove past this plantation yesterday, everything is so green!"
    },

    {
        "href": "8.jpg",
        "title": "Dunes",
        "alt": "My summer vacation to the Oregon Coast. I love the sandy dunes!"
    },

    {
        "href": "9.jpg",
        "title": "Countryside Lane",
        "alt": "We enjoyed a quiet stroll down this countryside lane."
    },

    {
        "href": "10.jpg",
        "title": "Sunset",
        "alt": "Sunset at the coast! The sky turned a lovely shade of orange."
    },

    {
        "href": "11.jpg",
        "title": "Cave",
        "alt": "I did a tour of a cave today and the view of the landscape below was breathtaking."
    },

    {
        "href": "12.jpg",
        "title": "Bluebells",
        "alt": "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
    },

    {
        "href": "13.jpg",
        "src": "https://www.youtube.com/embed/SbeHjcLOkgs?autoplay=false",
        "title": "Travel Love",
        "alt": "Top 10 of the most breathtaking places on this planet that you need to visit."
    },

    {
        "href": "14.jpg",
        "src": "https://www.youtube.com/embed/JxYConpTVZI?autoplay=false",
        "title": "Hyper Travel",
        "alt": "This film is a HDR hyperlapse postcard that will take you to a journey through Georgia."
    },

    {
        "href": "15.jpg",
        "src": "https://www.youtube.com/embed/GCcdBx4UUgk?autoplay=false",
        "title": "Travel",
        "alt": "A mix of memories from past years adventures for my travelblog on ✈ flysleepy.com."
    },

    {
        "href": "16.jpg",
        "src": "https://www.youtube.com/embed/MtCMtC50gwY?autoplay=false",
        "title": "NewYork Travel",
        "alt": "New York City is an international metropolis built on the shoulders of immigrants and their descendants."
    },

];


$(document).ready(function() {
    //cashe in variables we gonna use

    var $gallery = $(".photogallery");
    var $overlay = $('<div id="overlay"></div>');
    var $container = $('<div class="container"></div>');
    var $pervbutton = $('<div class="previous"><</div>');
    var $image = $("<img>");
    var $video = $('<div class="video"><iframe style="width:100%;height:100%;margin:auto;" frameborder="0" allowfullscreen></iframe></div>');
    var $close = $('<span id="close">x</span>');
    var $nextbutton = $('<div class="next">></div>');
    var $caption = $("<p></p>");
    var tracker;

    //asembeling the overlay

    $overlay.append($container);
    $container.append($pervbutton);
    $container.append($nextbutton);
    $container.append($close);
    $overlay.append($caption);


    $("body").append($overlay);



    //append the thumnails to the page
    var itemsHtml = '';

    $.each(galleryItems, function(item, value) {

        itemsHtml += '<a href="images/' + value.href +
            '"><img src="images/Thumbnails/' + value.href +
            '" title="' + value.title + '" alt="' + value.alt +
            '"></a>';


    });

    //keyup for input search

    $("input").keyup(function() {

        var $val = $(this).val().toLowerCase();
        var $photos = $(".photogallery a").find("img");
        $photos.parent().hide();
        $photos.each(function() {

            var $title = $(this).attr("title").toLowerCase();
            $title += $(this).attr("alt").toLowerCase();
            if ($title.indexOf($val) != -1) {
                $(this).parent().fadeIn();

            }
        });


    });



////////////////FUNCTIONS/////////////////


    // function to show overlay with Image

    function image_overlay() {

        $container.append($image);
        $image.before($pervbutton);
        $image.attr("src", 'images/' + galleryItems[tracker].href);
        $image.after($nextbutton);
        $overlay.fadeIn(800);

    }



    // function to show overlay with Video 
    function video_overlay() {

        $container.append($video);
        $video.before($pervbutton);
        $video.children().attr("src", galleryItems[tracker].src);
        $video.after($nextbutton);
        $overlay.fadeIn(800);
    }


    // function for checking the tracker and fading to the new one.

    function fading() {
        if (tracker < 12) {
            $image.hide();
            $image.attr("src", 'images/' + galleryItems[tracker].href);
            $image.fadeIn(800);
        }

        if (tracker === 12) {
            $image.hide();
            $image.replaceWith($video);
            $video.fadeIn(800);
        }

        if (tracker === 16) {
            tracker = 0;
            $image.hide();
            $video.replaceWith($image);
            $image.attr("src", 'images/' + galleryItems[tracker].href);
            $image.fadeIn(800);
        }

    }










    // generate the thumnails.


    $gallery.html(itemsHtml);


    $(".photogallery a").click(function(event) {

        event.preventDefault();
        tracker = $(this).index();

        var description = $(this).children("img").attr("alt");
        if (tracker >= 12) {

            video_overlay();
        }
        if (tracker < 12) {

            image_overlay();
        }

        $caption.text(description);

    });








    // next button 

    $nextbutton.click(function() {

        tracker++;

        fading();
        $video.children().attr("src", galleryItems[tracker].src);
        $caption.text(galleryItems[tracker].alt);


    });

    // previous button

    $pervbutton.click(function() {

        tracker--;


        if (tracker === 11) {
            $video.hide();
            $video.replaceWith($image);
            $video.fadeIn(800);

        }
        if (tracker < 0) {
            tracker = 15;
            $video.hide();
            $image.replaceWith($video);
            $video.children().attr("src", galleryItems[tracker].src);
            $video.fadeIn(800);
        }
        if (tracker < 16 && tracker >= 12) {
            $video.hide();
            $video.children().attr("src", galleryItems[tracker].src);
            $video.fadeIn(800);
        }
        if (tracker < 12) {
            $image.hide();
            $image.attr("src", 'images/' + galleryItems[tracker].href);
            $image.fadeIn(800);
        }



        $image.attr("src", 'images/' + galleryItems[tracker].href);
        $caption.text(galleryItems[tracker].alt);


    });




    //closing the overlay by clicking on it.

    $close.click(function() {
        $image.remove();
        $video.remove();
        $overlay.fadeOut(800);

    });





    // esc key function.

    $(document).keydown(function(e) {
        if (e.which == 27) {
            $close.click();
        }
    });

    // next key function.


    $(document).keydown(function(e) {
        if (e.which == 39) {
            $nextbutton.click();
        }
    });


    // previous key function.


    $(document).keydown(function(e) {
        if (e.which == 37) {
            $pervbutton.click();
        }
    });
























});

var galleryItems = [{
        "type": "image",
        "href": "1.jpg",
        "title": "Hay Bales",
        "alt": "I love hay bales. Took this snap on a drive through the countryside past some straw fields."
    },

    {
        "type": "image",
        "href": "2.jpg",
        "title": "Lake",
        "alt": "The lake was so calm today. We had a great view of the snow on the mountains from here."
    },

    {
        "type": "image",
        "href": "3.jpg",
        "title": "Canyon",
        "alt": "I hiked to the top of the mountain and got this picture of the canyon and trees below."
    },

    {
        "type": "image",
        "href": "4.jpg",
        "title": "Iceberg",
        "alt": "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."
    },

    {
        "type": "image",
        "href": "5.jpg",
        "title": "Desert",
        "alt": "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."
    },

    {
        "type": "image",
        "href": "6.jpg",
        "title": "Fall",
        "alt": "Fall is coming, I love when the leaves on the trees start to change color."
    },

    {
        "type": "image",
        "href": "7.jpg",
        "title": "Plantation",
        "alt": "I drove past this plantation yesterday, everything is so green!"
    },

    {
        "type": "image",
        "href": "8.jpg",
        "title": "Dunes",
        "alt": "My summer vacation to the Oregon Coast. I love the sandy dunes!"
    },

    {
        "type": "image",
        "href": "9.jpg",
        "title": "Countryside Lane",
        "alt": "We enjoyed a quiet stroll down this countryside lane."
    },

    {
        "type": "image",
        "href": "10.jpg",
        "title": "Sunset",
        "alt": "Sunset at the coast! The sky turned a lovely shade of orange."
    },

    {
        "type": "image",
        "href": "11.jpg",
        "title": "Cave",
        "alt": "I did a tour of a cave today and the view of the landscape below was breathtaking."
    },

    {
        "type": "image",
        "href": "12.jpg",
        "title": "Bluebells",
        "alt": "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
    },

    {
        "type": "video",
        "href": "13.jpg",
        "src": "https://www.youtube.com/embed/SbeHjcLOkgs?autoplay=false",
        "title": "Travel Love",
        "alt": "Top 10 of the most breathtaking places on this planet that you need to visit."
    },

    {
        "type": "video",
        "href": "14.jpg",
        "src": "https://www.youtube.com/embed/JxYConpTVZI?autoplay=false",
        "title": "Hyper Travel",
        "alt": "This film is a HDR hyperlapse postcard that will take you to a journey through Georgia."
    },

    {
        "type": "video",
        "href": "15.jpg",
        "src": "https://www.youtube.com/embed/GCcdBx4UUgk?autoplay=false",
        "title": "Travel",
        "alt": "A mix of memories from past years adventures for my travelblog on ✈ flysleepy.com."
    },

    {
        "type": "video",
        "href": "16.jpg",
        "src": "https://www.youtube.com/embed/MtCMtC50gwY?autoplay=false",
        "title": "NewYork Travel",
        "alt": "New York City is an international metropolis built on the shoulders of immigrants and their descendants."
    },

]


$(document).ready(function() {
    //cashe in variables we gonna use

    var $gallery = $(".photogallery");
    var $overlay = $('<div id="overlay"></div>');
    var $container = $('<div class="container"></div>');
    var $pervbutton = $('<div class="previous"><</div>');
    var $image = $("<img>");
    var $video = $('<iframe width="420" height="315" frameborder="0" allowfullscreen></iframe>')
    var $nextbutton = $('<div class="next">></div>');
    var $caption = $("<p></p>");
    var tracker;
    //asembeling the overlay

    $overlay.append($container);
    $container.append($pervbutton);


    $container.append($nextbutton);
    $overlay.append($caption);


    $("body").append($overlay);



    //append the thumnails to the page
    var itemsHtml = '';
    var count = 0;
    $.each(galleryItems, function(item, value) {


        itemsHtml += '<a href="images/' + value.href +
            '"><img src="images/thumbnails/' + value.href +
            '" title="' + value.title + '" alt="' + value.alt +
            '" class="' + count + '"></a>'
        count++;

    });



    // function to show overlay with Video 
    function video_overlay() {

        $container.append($video);
        $video.before($pervbutton);
        $video.attr("src", galleryItems[tracker].src);
        $video.after($nextbutton);
        $overlay.fadeIn(500);
    };




    // function to show overlay with Image

    function image_overlay() {

        $container.append($image);
        $image.before($pervbutton)
        $image.attr("src", 'images/' + galleryItems[tracker].href);
        $image.after($nextbutton);
        $overlay.fadeIn(500);

    };





    // generate the thumnails.


    $gallery.html(itemsHtml);


    $(".photogallery a").click(function(event) {

        event.preventDefault();
        tracker = $(this).index();
        var photo = $(this).attr("href");
        var description = $(this).children("img").attr("alt");
        if (tracker >= 12) {
            video_overlay();
        } else {
            image_overlay();
        }

        $caption.text(description);

    });








    //keyup for input search

    $("input").keyup(function() {
        var $val = $(this).val().toLowerCase();
        var $photos = $(".photogallery a").find("img");
        $photos.parent().fadeOut(500);

        $photos.each(function() {

            var $title = $(this).attr("title").toLowerCase();

            if ($title.indexOf($val) != -1) {

                $(this).parent().fadeIn(500);

            }
        });

    });



    var galleryLenght = $(".photogallery a").length



    // next button 

    $nextbutton.click(function() {

        tracker++;
        image_overlay();
        
        var cap = $("#overlay p");

        
        cap.text(galleryItems[tracker].alt);

        if (tracker >= 12) {
            $image.hide();
            video_overlay();
        }



        if (tracker >= galleryLenght) {
            tracker = 0;
            $video.hide();
            image_overlay();


        }
    });

    // previous button

    $pervbutton.click(function() {

        tracker--;
        image_overlay();
        var cap = $("#overlay p");

        
        cap.text(galleryItems[tracker].alt);

        if (tracker <= 0 ) {

            tracker = 15;
            
        }
        if (tracker >= 12){
            $image.hide();
            video_overlay();
        }
        if (tracker < 12){
            $video.hide();
            image_overlay();
        }






    });



































});

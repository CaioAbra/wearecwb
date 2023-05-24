$(document).ready(function () {
    var totalItems = $('ul.side-nav li').length;
    var currentItem = 0;

    function showItem(index) {
        $('ul.side-nav li').removeClass('is-active');
        $('ul.side-nav li').eq(index).addClass('is-active');


        $('ul#space li.section').removeClass('section-active');
        $('ul#space li.section').eq(index).addClass('section-active');
    }

    function scrollNext() {
        currentItem++;
        if (currentItem >= totalItems) {
            currentItem = 0;
        }
        showItem(currentItem);
    }

    function scrollPrev() {
        currentItem--;
        if (currentItem < 0) {
            currentItem = totalItems - 1;
        }
        showItem(currentItem);
    }

    $('.container').on('wheel', function (event) {
        if (event.originalEvent.deltaY > 0) {
            scrollNext();
        } else {
            scrollPrev();
        }
    });

    $('ul.side-nav li').click(function () {
        var clickedIndex = $(this).index();
        showItem(clickedIndex);
        currentItem = clickedIndex;
    });



    // carousel
    var carousel = $('.carousel');
    var items = $('.carousel-items .item');
    var currentItem = 0;

    $('.slider--next').click(function () {
        $(items[currentItem]).removeClass('active');
        currentItem++;
        if (currentItem >= items.length) {
            currentItem = 0;
        }
        $(items[currentItem]).addClass('active');
        carousel.css('transform', 'translateX(' + (-33.33 * currentItem) + '%)');
    });

    $('.slider--prev').click(function () {
        $(items[currentItem]).removeClass('active');
        currentItem--;
        if (currentItem < 0) {
            currentItem = items.length - 1;
        }
        $(items[currentItem]).addClass('active');
        carousel.css('transform', 'translateX(' + (-33.33 * currentItem) + '%)');
    });
})

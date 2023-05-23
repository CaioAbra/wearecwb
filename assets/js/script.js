$(document).ready(function () {
    var totalItems = $('ul.side-nav li').length;
    var currentItem = 0;

    function showItem(index) {
        $('ul.side-nav li').removeClass('is-active');
        $('ul.side-nav li').eq(index).addClass('is-active');
        $('#space li.l-section.section').removeClass('section--is-active');
        $('#space li.l-section.section').eq(index).addClass('section--is-active');
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
});

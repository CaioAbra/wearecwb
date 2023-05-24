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

});

// carousel
$(document).ready(function() {
    var itemWidth = $(".carousel-items .item").outerWidth(true);
    var itemCount = $(".carousel-items .item").length;
    var visibleItems = 3; // Número de itens visíveis
    var responsiveThreshold1 = 500; // Limite de largura para dispositivos até 500px
    var responsiveThreshold2 = 768; // Limite de largura para dispositivos de 501px a 767px
  
    $(".carousel-items").width(itemWidth * itemCount);
  
    function moveCarousel() {
      var currentPosition = parseInt($(".carousel-items").css("left"));
      var newPosition;
  
      $(".carousel-items").animate(
        {
          left: currentPosition - itemWidth,
        },
        500,
        function() {
          $(".carousel-items .item:first").appendTo(".carousel-items");
          $(".carousel-items").css("left", 0);
          updateActiveItem();
        }
      );
    }
  
    function updateActiveItem() {
      var activeItem = Math.ceil(visibleItems / 2);
  
      $(".carousel-items .item").removeClass("active");
      $(".carousel-items .item:nth-child(" + activeItem + ")").addClass("active");
    }
  
    function adjustCarousel() {
      var windowWidth = $(window).width();
  
      if (windowWidth <= responsiveThreshold1) {
        visibleItems = 1;
      } else if (windowWidth <= responsiveThreshold2) {
        visibleItems = 2;
      } else {
        visibleItems = 3;
      }
  
      itemWidth = $(".carousel-items .item").outerWidth(true);
      $(".carousel-items").width(itemWidth * itemCount);
  
      var currentPosition = parseInt($(".carousel-items").css("left"));
      var newPosition = -itemWidth * (visibleItems - 1);
  
      if (currentPosition < newPosition) {
        $(".carousel-items").css("left", newPosition);
      }
  
      updateActiveItem();
    }
  
    adjustCarousel();
  
    $(window).resize(function() {
      adjustCarousel();
    });
  
    $(".slider-prev").click(function() {
      $(".carousel-items .item:last").prependTo(".carousel-items");
      $(".carousel-items").css("left", -itemWidth);
      $(".carousel-items").animate({ left: 0 }, 500, function() {
        updateActiveItem();
      });
    });
  
    $(".slider-next").click(function() {
      moveCarousel();
    });
  });
  

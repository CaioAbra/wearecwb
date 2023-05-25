$(document).ready(function () {
  var totalItems = $('ul.side-nav li').length;
  var currentItem = 0;

  function showItem(index) {
    $('ul.side-nav li').removeClass('is-active');
    $('ul.side-nav li').eq(index).addClass('is-active');

    $('ul#space li.section').removeClass('section-active');
    $('ul#space li.section').eq(index).addClass('section-active');

    $('.containerList li').removeClass('is-active');
    $('.containerList li').eq(index).addClass('is-active');
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

  function buttonCtaTOP() {
    if ($("ul#space li.section.section-active #produtos").length > 0) {
      $(".header-cta").addClass("is-active");

      $(".header-cta").click(function () {
        var clickedIndex = $(this).index() + 2;
        showItem(clickedIndex);
        currentItem = clickedIndex;
      });

    } else if ($("ul#space li.section.section-active #sobreNos").length > 0) {
      $(".header-cta").addClass("is-active");
    } else {
      $(".header-cta").removeClass("is-active");
    }
  }

  $('.container').on('wheel', function (event) {

    if (event.originalEvent.deltaY > 0) {
      scrollNext();
      buttonCtaTOP();
    } else {
      scrollPrev();
      buttonCtaTOP();
    }
  });

  $('.containerList li').on('wheel', function (event) {

    if (event.originalEvent.deltaY > 0) {
      scrollNext();
      buttonCtaTOP();
    } else {
      scrollPrev();
      buttonCtaTOP();
    }
  });

  $('ul.side-nav li').click(function () {
    var clickedIndex = $(this).index();
    showItem(clickedIndex);
    currentItem = clickedIndex;
    buttonCtaTOP();
  });

  $('.containerList li').click(function () {
    var clickedIndex = $(this).index();
    showItem(clickedIndex);
    currentItem = clickedIndex;
    buttonCtaTOP();

    $('.ship').removeAttr("style");
    $('.viewport').removeAttr("style");
    $('.viewport.miniatura').removeAttr("style");
    $(".viewport").removeClass("miniatura");



  });

  //botão de contato
  $('button.cta').on('click', function (event) {
    var clickedIndex = $(this).index() + 2;
    showItem(clickedIndex);
    currentItem = clickedIndex;
  });

});

// carousel
$(document).ready(function () {
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
      function () {
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

  $(window).resize(function () {
    adjustCarousel();
  });

  $(".slider-prev").click(function () {
    $(".carousel-items .item:last").prependTo(".carousel-items");
    $(".carousel-items").css("left", -itemWidth);
    $(".carousel-items").animate({ left: 0 }, 500, function () {
      updateActiveItem();
    });
  });

  $(".slider-next").click(function () {
    moveCarousel();
  });
});

//estrelas de fundo
$(document).ready(function () {
  var numEstrelas = 200; // Número total de estrelas
  var contenedorEstrelas = $('.estrelas');
  var larguraJanela = $(window).width();
  var alturaJanela = $(window).height();

  for (var i = 0; i < numEstrelas; i++) {
    var tamanho = Math.random() * 4; // Tamanho aleatório da estrela (entre 0 e 4)
    var duracao = "infinite"; // Duração infinita da animação
    var left = Math.random() * larguraJanela; // Posição horizontal aleatória da estrela (entre 0 e a largura da janela)
    var top = Math.random() * alturaJanela; // Posição vertical aleatória da estrela (entre 0 e a altura da janela)
    var opacity = Math.random(); // Opacidade aleatória da estrela (entre 0 e 1)
    var speedX = Math.random() * 10 - 5; // Velocidade aleatória do movimento horizontal (entre -5 e 5)
    var speedY = Math.random() * 10 - 5; // Velocidade aleatória do movimento vertical (entre -5 e 5)

    var estrela = $('<div class="estrela"></div>').css({
      width: tamanho + 'px',
      height: tamanho + 'px',
      left: left + 'px',
      top: top + 'px',
      opacity: opacity
    });

    contenedorEstrelas.append(estrela);

    animateEstrela(estrela, duracao, speedX, speedY);
  }


  function animateEstrela(estrela, speedX, speedY) {
    estrela.css('animation', 'estrela-animation infinite linear');
    estrela.css('animation-duration', Math.random() * 5 + 1 + 's');
    estrela.css('animation-delay', Math.random() + 's');
    estrela.css('transform', 'translate(' + speedX + 'px, ' + speedY + 'px)');

    // Reiniciar a animação após sua conclusão
    estrela.on('animationiteration', function () {
      estrela.css('animation-duration', Math.random() * 5 + 1 + 's');
      estrela.css('animation-delay', Math.random() + 's');
      estrela.css('transform', 'translate(' + speedX + 'px, ' + speedY + 'px)');
    });
  }

});

$(document).ready(function () {
  $(".menu-toggle").on('click', function () {
    if (!$(".viewport").hasClass("miniatura")) {
      $(".viewport").addClass("miniatura");
    } else {
      $(".viewport").removeClass("miniatura");
    }

    const w = $(window).width();
    const h = $(window).height()
    var perspective = Math.floor((w * h) / 1800);
    var perspectiveNegative = -perspective;

    if ($(".viewport").hasClass("miniatura")) {
      $('.ship').css({
        'column-count': '2',
        'display': 'flex',
        'perspective': perspective,
        'height': '100vh'
      });

      $('.viewport').css({
        'outline': '1vw solid #2653c4'
      });

      if (w > 768) {
        $('.viewport').css({
          'transform': 'rotateY(45deg) scale(.5) translateZ(20vw)'
        });
      } else if (w > 500) {
        $('.viewport').css({
          'transform': 'rotateY(45deg) scale(.5) translateZ(20vw)',
          'left': '3rem'
        });
      } else {
        $('.viewport').css({
          'transform': 'rotateY(45deg) scale(.2) translateZ(20vw)',
          'left': '1rem'
        });
      }

    } else {
      $('.ship').removeAttr("style");
      $('.viewport').removeAttr("style");
      $('.viewport.miniatura').removeAttr("style");
    }
  });


});
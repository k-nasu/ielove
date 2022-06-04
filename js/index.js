/* global s $ */

/* hambuger menu
------------------------------*/
$('.header__menu').on('click', function() {
  
  let content = $('.header__nav');

  if (!content.is(':visible')) {
    content.slideDown();
    $(e.target).removeClass('header__menu-open');
  } else {
    content.slideUp();
  }
});

/* accordion
------------------------------*/
$('.accordion').on('click', function(e) {
  
  let target = $(e.target)
  .closest('.header__nav-item')
  .find('.header__nav-list');

  let pointed = $(e.target)
  .closest('.header__nav-title')

  console.log($(e.target));
  if (!target.is(':visible')) {
    target.slideDown();
    pointed.removeClass('header__nav-list-close');
  } else {
    target.slideUp();
    pointed.addClass('header__nav-list-close');
  }
})


/* animation
------------------------------*/
$('.slideInLeft').waypoint({
  handler: function(direction) {
    if (direction === 'down') {
      $(this.element).addClass('animate__slideInLeft')
      this.destroy
    }
  },

  offset: '60%',
})

$('.slideInRight').waypoint({
  handler: function(direction) {
    if (direction === 'down') {
      $(this.element).addClass('animate__slideInRight')
      this.destroy
    }
  },

  offset: '60%',
})


$('.business-content__category').waypoint({
  handler: function(direction) {
    if (direction === 'down') {
      $(this.element).addClass('animate__fadeIn');
      this.destroy
    }
  },

  offset: '60%',
})
/*jslint browser: true, indent: 2 */
(function ($) {
  'use strict';
  $.fn.inviewport = function (options) {
    var settings = $.extend({
      'minPercentageInView' : 100,
      'standardClassName': 'in-view'
    }, options);
    this.each(function () {
      var $this = $(this),
        $win = $(window),
        changed = false,
	timer,
        isVisible = function () {
          var c = settings.className || settings.standardClassName,
            min = (settings.threshold || settings.minPercentageInView) / 100,
            xMin = $this.width() * min,
            yMin = $this.height() * min,
            winPosX = $win.scrollLeft() + $win.width(),
            winPosY = $win.scrollTop() + $win.height(),
            elPosX = $this.offset().left + xMin,
            elPosY = $this.offset().top + yMin;
          if (winPosX > elPosX && winPosY > elPosY) {
            if(!$this.hasClass(c)) $this.trigger("inviewport");
            $this.addClass(c);
	    return true;
          }
	  else {
	    return false;
	  }
        };
      $win.on('ready', isVisible())
        .on('resize scroll', function () {
          changed = true;
        });
      timer = setInterval(function () {
        if (changed) {
          changed = false;
          if (isVisible()) {
	    clearInterval(timer);
	  }
        }
      }, 250);
    });
  };
}(jQuery));

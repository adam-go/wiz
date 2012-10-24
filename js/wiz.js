var _ = {
    bind: function (obj, meth) {
        var method = obj[meth];

        return function () {
            method.apply(obj, arguments);
        }
    }
}

var Wizard = function (selector) {
    var n = this.jNode = $(selector);
    this.slides = $('.slides', n);
    this.currentPane = $('fieldset:first-child', this.slides);
    $('.actions button.next', n).on('click', _.bind(this, 'nextSlide'));
    $('.actions button.prev', n).on('click', _.bind(this, 'prevSlide'));
}

Wizard.prototype = {
    nextSlide: function () {
        this.moveSlide(this.currentPane.next(), function (ml, w) { return ml - w; });
    },
    
    prevSlide: function () {
        this.moveSlide(this.currentPane.prev(), function (ml, w) { return ml + w; });
    },
    
    moveSlide: function (slide, cb) {
        if(slide.length == 0) return;
        var w = this.currentPane.outerWidth();
        var ml = parseInt(this.slides.css('margin-left'));
        this.slides.animate({marginLeft: cb(ml, w) + 'px'}, 400, 'swing');
        this.currentPane = slide;
    }
};
​
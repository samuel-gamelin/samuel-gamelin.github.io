/**
 * Loads a random background image when the document is ready. Also initializes form validation and applies necessary fallbacks.
 */
$(document).ready(function () {
    // Choosing a random image
    var min = 1;
    var max = 7;

    $('.bg').css('background-image', 'url(' + 'assets/images/' + (Math.floor(Math.random() * (max - min + 1)) + min) + '.jpg' + ')');

    // Setting up form validation
    $.validator.messages.required = '';
    $.validator.messages.email = '';
    $.validator.addMethod("validate_email", function (value) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    }, "");

    $('input').on('change', function (e) {
        $(this).removeClass($(this).valid() ? 'is-invalid' : 'is-valid');
        $(this).addClass($(this).valid() ? 'is-valid' : 'is-invalid');
    })

    $('form').validate({
        highlight: function (element) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).addClass('is-valid');
        },
        showErrors: function () { },
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                validate_email: true
            },
            _subject: {
                required: true
            },
            message: {
                required: true
            }
        }
    });

    /**
     * Fallback for frosted card styling on non-chrome/safari browsers.
     */
    if (!(navigator.userAgent.search("Chrome") >= 0 || (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0))) {
        $('.frosted-card').css('background-color', 'rgba(25, 25, 25, 0.75)');
    }

    /**
     * Adjust positioning of landing card based on navbar dimensions
     */
    $('#landing').css('margin-top', ($('nav').outerHeight(true) / 2) + 'px');
});

/**
 * Collapse the navigation bar when a link inside of it is clicked.
 */
$('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});

/**
 * Collapse the navigation bar when an element other than itself is clicked.
 */
$(document).on('click', function (e) {
    if (!$(e.target).is('.navbar')) {
        $('.navbar-collapse').collapse('hide');
    }
})

define([
    'jquery',
    'intlTelInput'
], function ($) {

    return function (config, node) {

        var input = $(node),
            errorMsg = $("#error-msg"),
            validMsg = $("#valid-msg");

        // here, the index maps to the error code returned from getValidationError - see readme
        var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

        // initialise plugin
        var iti = input.intlTelInput(config);

        var reset = function () {
            input.removeClass("mage-error");
            errorMsg.html("");
            errorMsg.addClass("hide");
            validMsg.addClass("hide");
        };

        // on blur: validate
        input.on('blur', function () {
            reset();
            if (input.val().trim()) {
                if ($(this).intlTelInput("isValidNumber")) {
                    validMsg.removeClass("hide");
                } else {
                    input.addClass("mage-error");
                    var errorCode = $(this).intlTelInput("getValidationError");
                    errorMsg.html(errorMap[errorCode]);
                    errorMsg.removeClass("hide");
                }
            }
        });

        // on keyup / change flag: reset
        input.on('change keyup', reset);
    };
});

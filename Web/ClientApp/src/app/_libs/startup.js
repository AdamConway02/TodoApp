// Close bootstrap menu after item is clicked on collapsible menu in mobile mode. 
// This behaviour is not available out of box
$(function () {
    $(document).click(function (event) {
        var el = $(event.target);
        var _opened = !$('.navbar-toggler').hasClass('collapsed');
        if (_opened === true && !el.hasClass('navbar-toggler')) {
            $('button.navbar-toggler').click();
        }
    });
});
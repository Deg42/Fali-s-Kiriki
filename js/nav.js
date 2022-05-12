$('#logout').on('click', function (event) {
    event.preventDefault();

    logout();
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    location.reload();

}

function isTokenExpired() {
    let token = JSON.parse(localStorage.getItem('token'));
    let now = new Date().getTime();
    if (now > token.timestamp) {
        return true;
    }
    return false;
}

jQuery(function () {

    if (localStorage.getItem('token') === null || isTokenExpired()) {
        $('#logout').hide();
        $('#play').hide();
        $('#login').show();
        $('#register').show();
    } else {
        $('#logout').show();
        $('#play').show();
        $('#login').hide();
        $('#register').hide();
        // Add username element in nav bar
        $('.navbar-nav').children(':eq(1)').after('<span class="navbar-text fw-bold text-danger  me-2">' + localStorage.getItem('username') + '</span>');
    }

});
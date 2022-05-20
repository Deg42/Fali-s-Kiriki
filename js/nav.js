$('#logoutNav').on('click', function (event) {
    event.preventDefault();
    logout();
    window.location.href = 'login.html';
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    location.reload();

}

function isTokenExpired() {
    if (JSON.parse(localStorage.getItem('token')) === null) {
        return true;
    }
    let token = JSON.parse(localStorage.getItem('token'));
    let now = new Date().getTime();
    if (now > token.timestamp) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        return true;
    }
    return false;
}

jQuery(function () {

    if (localStorage.getItem('token') === null || isTokenExpired()) {
        $('#logoutNav').hide();
        $('#playNav').hide();
        $('#loginNav').show();
        $('#registerNav').show();
    } else {
        $('#logoutNav').show();
        $('#playNav').show();
        $('#loginNav').hide();
        $('#registerNav').hide();
        $('.navbar-nav').children(':eq(1)').after('<span class="navbar-text fw-bold text-light  me-2">' + localStorage.getItem('username') + '</span>');
    }

});
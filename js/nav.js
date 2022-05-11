$('#logout').on('click', function(event) {
    event.preventDefault();

    logout();
});

function logout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    location.reload();

}
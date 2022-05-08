$("#login").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/login_check",
        data: ({
            username: $('#username').val(),
            password: $('#password').val()
        }),
        success: function (json) {
            console.log(json);
            // Save token
            localStorage.setItem("token", json.token);
            // Clear form
            $('#username').val("");
            $('#password').val("");
            // Redirect
            window.location.href = "games.html";
        },
        error: function (result) {
            // Show error message
            console.log(result);
        }
    });
    return false;
});
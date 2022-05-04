$("#register").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/register",
        data: ({
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#rPassword').val()
        }),
        success: function (json) {
            console.log(json);
            // Show success message
            // Clear form
            // Redirect
        },
        error: function (result) {
            // Show error message
            console.log(result);
        }
    });
    return false;
});
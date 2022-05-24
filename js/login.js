function resetErrors() {
    $(':input').css({ 'border-color': '#ced4da', 'box-shadow': 'none' });
    $('.invalid-feedback').removeClass('d-block').html('');
}

function addError(element, feedbackElement, message) {
    $(element).css('border', '1px solid red');
    feedbackElement.addClass("d-block")
        .html(message);
}

function setValids(errors, elementsId) {
    elementsId.forEach(function (element) {
        if (!errors.has(element)) {
            $(element).css({ 'border': '1px solid green', 'box-shadow': '0 0 3px 1px green' });
        }
    });
}

function serverValidator(data) {

    console.log(data);
    if (data.message === "Invalid credentials.") {
        $('#username').css('border', '1px solid red');
        $('#password').css('border', '1px solid red');
        $('#generalFeedback').addClass("d-block")
            .html('El nombre de usuario o la contraseña no son correctos');
    }


}

function formHasError() {

    let usernameVal = $('#username').val();
    let passwordVal = $('#password').val();

    let elementsId = ["#username", "#password"];
    let errors = new Set();

    if (usernameVal === "" || usernameVal === null) {
        addError($('#username'), $('#usernameFeedback'), 'El nombre de usuario no puede estar vacío');
        errors.add("#username");
    }

    if (passwordVal === "" || passwordVal === null) {
        addError($('#password'), $('#passwordFeedback'), 'La contraseña no puede estar vacía');
        errors.add("#password");
    }

    setValids(errors, elementsId);

    if (errors.size > 0) {
        return true;
    }

}

$("#loginButton").on("click", function (event) {
    event.preventDefault();

    resetErrors();

    if (formHasError()) {
        return false;
    }

    let username = $('#username').val();
    let password = $('#password').val();

    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/login_check",
        data: ({
            username: username,
            password: password
        }),
        success: function (json) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.setItem("token", JSON.stringify({ value: json.token, timestamp: new Date().getTime() + 3600000 }));
            localStorage.setItem("username", username);

            $('#username').val("");
            $('#password').val("");

            window.location.href = "games.html";
        },
        error: function (result) {
            resetErrors();
            serverValidator(result.responseJSON);
        }
    });
    return false;
});
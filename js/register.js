(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function resetErrors() {
    $(':input').css({'border-color': '#ced4da', 'box-shadow': 'none'});
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

function formHasError() {

    let usernameVal = $('#username').val();
    let emailVal = $('#email').val();
    let passwordVal = $('#rPassword').val();
    let confirmPasswordVal = $('#repeatPassword').val();
    let termsVal = $('#terms').is(':checked');

    let elementsId = ["#username", "#email", "#rPassword", "#repeatPassword", "#terms"];
    let errors = new Set();

    let usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
    let emailPattern = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    let passwordPattern = /^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/;

    if (!usernamePattern.test(usernameVal)) {
        addError($('#username'), $('#usernameFeedback'), 'El nombre de usuario debe tener entre 3 y 20 caracteres');
        errors.add("#username");
    }

    if (usernameVal !== "" && usernameVal.indexOf(' ') !== -1) {
        addError($('#username'), $('#usernameFeedback'), 'El nombre de usuario no puede contener espacios');
        errors.add("#username");
    }

    if (usernameVal === "" || usernameVal === null) {
        addError($('#username'), $('#usernameFeedback'), 'El nombre de usuario no puede estar vacío');
        errors.add("#username");
    }

    if (!emailPattern.test(emailVal)) {
        addError($('#email'), $('#emailFeedback'), 'El email no es válido');
        errors.add("#email");
    }

    if (emailVal === "" || emailVal === null) {
        addError($('#email'), $('#emailFeedback'), 'El email no puede estar vacío');
        errors.add("#email");
    }

    if (passwordVal.length < 8 || passwordVal.length > 20) {
        addError($('#rPassword'), $('#passwordFeedback'), 'La contraseña debe tener entre 8 y 20 caracteres');
        errors.add("#rPassword");
    }

    if (!passwordPattern.test(passwordVal)) {
        addError($('#rPassword'), $('#passwordFeedback'), 'No contiene: letra mayúscula, una minúscula y un número');
        errors.add("#rPassword");
    }

    if (passwordVal === "" || passwordVal === null) {
        addError($('#rPassword'), $('#passwordFeedback'), 'La contraseña no puede estar vacía');
        errors.add("#rPassword");
    }

    if (confirmPasswordVal === "" || confirmPasswordVal === null || confirmPasswordVal !== passwordVal) {
        addError($('#repeatPassword'), $('#repeatPasswordFeedback'), 'Las contraseñas no coinciden');
        errors.add("#repeatPassword");
    }

    if (!termsVal) {
        addError($('#terms'), $('#termsFeedback'), 'Debes aceptar los términos y condiciones');
        errors.add("#terms");
    }

    setValids(errors, elementsId);

    if (errors.size > 0) {
        console.log(errors);
        return true;
    }
}

function serverValidator(data) {

    if (data.error === "There is already a player with that username") {
        $('#username').css('border', '1px solid red');
        $('#usernameFeedback').addClass("d-block")
            .html('Ya hay un jugador con ese nombre de usuario');
    }

    if (data.error === "There is already a player with that email") {
        $('#email').css('border', '1px solid red');
        $('#emailFeedback').addClass("d-block")
            .html('Ya hay un jugador con ese correo');
    } 

}



$("#register").on("click", function (event) {
    event.preventDefault();

    resetErrors();

    if (formHasError()) {
        return false;
    }

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
            $('#successModal').modal('show');
            // Clear form
            usernameVal = "";
            emailVal = "";
            passwordVal = "";
            confirmPasswordVal = "";
            termsVal = false;
            // Redirect in a few seconds    
            setTimeout(function () {
                window.location.href = "login.html";
            }, 4000);
        },
        error: function (result) {
            resetErrors();
            serverValidator(result.responseJSON);
        }
    });
})
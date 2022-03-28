<?php
session_start();
require_once('crud.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="icon" type="image/x-icon" href="assets/icons/two-dices-alt.svg" />

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <link rel="stylesheet" href="css/style-guide.css" />

    <title>Kiriki Web App</title>
</head>

<body>
    <?php
    require_once('templates/header.php');
    if (isset($_SESSION['username'])) {
        header('game.php');
    }
    ?>
    <main>
        <div class="container">
            <h1>Registro</h1>
            <form role="form" id="register-form" method="POST">

                <div class="mb-3">
                    <label for="usuario" class="form-label">Nombre de usuario <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="username" name="username">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email" name="email">
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-6">
                        <label class="form-label">Contraseña <span class="text-danger">*</span></label>
                        <input type="password" class="form-control" id="password1" name="password1">
                    </div>
                    <div class="col-sm-6">
                        <label class="form-label">Repetir Contraseña <span class="text-danger">*</span></label>
                        <input type="password" class="form-control" id="password2" name="password2">
                    </div>
                </div>

                <div class="col-lg-4 offset-lg-9 text-right mt-3">
                    <button type="submit" class="btn btn-primary" name="Register">Registrarse</button>
                </div>

            </form>
        </div>
    </main>

    <?php
    if (isset($_POST["Register"])) {
        register();
    }
    ?>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    -->

    <!-- JQuery -->
    <script src="js/jquery-3.6.0.min.js"></script>

    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/79f56e797f.js" crossorigin="anonymous"></script>

    <script>

    </script>
</body>

</html>
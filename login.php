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
            <h1>Iniciar sesión</h1>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                <p>Si no tienes cuenta, crea una en la página de <a href="register.php">Registro</a></p>
                <div class="mb-3">
                    <label for="usuario" class="form-label">Nombre de usuario</label>
                    <input type="text" class="form-control" id="username" name="username">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="password" name="password">
                </div>

                <div class="col-lg-4 offset-lg-9 text-right mt-3">
                    <button type="submit" class="btn btn-primary" name="Iniciar">Iniciar sesión</button>
                </div>

            </form>
        </div>
    </main>

    <?php
    if (isset($_POST["Iniciar"])) {
        login();
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
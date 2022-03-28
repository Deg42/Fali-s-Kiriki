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
  if (!isset($_SESSION['username'])) {
    header('login.php');
  }
  ?>
  <main>
    <div class="container">
      <h1>Kiriki</h1>

      <div class="card" id="selectGame">
        <h3>Unirse a Mesa</h3>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
          <div class="form-group">
            <label for="mesa">Mesa</label>
            <input type="text" class="form-control" id="mesa" name="mesa" aria-describedby="mesa" placeholder="Mesa">
          </div>
          <div class="form-group">
            <label for="mesaPass">Contraseña</label>
            <input type="password" class="form-control" id="mesaPass" name="mesaPass" placeholder="Contraseña">
          </div>
          <button type="submit" class="btn btn-primary" name="Entrar">Entrar</button>
        </form>
      </div>

      <div class="card" id="createGame">
        <h3>Crear Mesa</h3>
        <form action="" method="POST">
          <div class="form-group">
            <label for="createMesa">Mesa</label>
            <input type="text" class="form-control" id="createMesa" name="createMesa" aria-describedby="createMesa" placeholder="Mesa">
          </div>
          <div class="form-group">
            <label for="createMesaPass">Contraseña</label>
            <input type="password" class="form-control" id="createMesaPass" name="createMesaPass" placeholder="Contraseña">
          </div>
          <button type="submit" class="btn btn-primary" name="Crear">Crear</button>
        </form>
      </div>

      
    </div>
  </main>
  <?php
  if (isset($_POST["Entrar"])) {
    searchGame();
  }
  if (isset($_POST["Crear"])) {
    createGame();
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


</body>

</html>
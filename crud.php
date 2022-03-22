<?php
function login()
{
    require_once('bd.php');
    $sql = "SELECT username, email, password, reg_date, games_won FROM players WHERE username = :username";

    $consulta = $bd->prepare($sql);
    $consulta->execute(["username" => $_POST['username']]);
    $usuario = $consulta->fetch();

    if (!empty($usuario) and password_verify($_POST['password1'], $usuario['password'])) {
        $_SESSION['username'] = $usuario['username'];
        $_SESSION['email'] = $usuario['email'];
        $_SESSION['reg_date'] = $usuario['reg_date'];
        $_SESSION['games_won'] = $usuario['games_won'];
        return true;
    } else {
        return $error = 'Usuario o clave incorrectos';
    }
}


function signup()
{
    require_once('bd.php');
    $sql = "INSERT INTO players (username, email, password, reg_date, games_won) VALUES (:username, :email, :password, :reg_date, :games_won)";

    $consulta = $bd->prepare($sql);
    $consulta->execute(
        [
            "username" => $_POST['username'],
            "email" => $_POST['email'],
            "password" => password_hash($_POST['password1'], PASSWORD_DEFAULT),
            "reg_date" => (new \DateTime())->format('Y-m-d H:i:s'),
            "games_won" => 0
        ]
    );

    if ($consulta) {
        header("Location:index.php");
    } else {
        return $error = 'Usuario o clave incorrectos';
    }
}

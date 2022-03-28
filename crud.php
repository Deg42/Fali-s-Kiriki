<?php
function login()
{
    require_once('bd.php');
    $sql = "SELECT `player_id`, `username`, `email`, `password`, `reg_date`, `games_won` FROM players WHERE username = :username";

    $consulta = $bd->prepare($sql);
    $consulta->execute(["username" => $_POST['username']]);
    $usuario = $consulta->fetch();

    if (!empty($usuario) and password_verify($_POST['password'], $usuario['password'])) {
        $_SESSION['player_id'] = $usuario['player_id'];
        $_SESSION['username'] = $usuario['username'];
        $_SESSION['email'] = $usuario['email'];
        $_SESSION['reg_date'] = $usuario['reg_date'];
        $_SESSION['games_won'] = $usuario['games_won'];

        header("Location:index.php");
        exit;
    } else {
        return $error = 'Usuario o clave incorrectos';
    }
}


function register()
{
    require_once('bd.php');
    $sql = "INSERT INTO players (`username`, `email`, `password`, `reg_date`, `games_won`) VALUES (:username, :email, :password, :reg_date, :games_won)";

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
        exit;
    }
}

function createGame()
{
    require_once('bd.php');
    $sql = "INSERT INTO games (`host_id`, `name`, `password`, `date`) VALUES (:host_id, :name, :password, :date)";

    $consulta = $bd->prepare($sql);
    $consulta->execute(
        [
            "host_id" => $_SESSION['player_id'],
            "name" => $_POST['createMesa'],
            "password" => password_hash($_POST['createMesaPass'], PASSWORD_DEFAULT),
            "date" => (new \DateTime())->format('Y-m-d H:i:s')
        ]
    );

    if ($consulta) {
        $_SESSION["game"] = $_POST['createMesaPass'];
        header("Location:game.php");
        exit;
    } else {
        return $error = 'Error al crear la mesa';
    }
}

function searchGame()
{
    require_once('bd.php');
    $sqlSearch = "SELECT `game_id`, `name`, `password`, `date` FROM games WHERE `name` = :name";

    $consultaSearch = $bd->prepare($sqlSearch);
    $consultaSearch->execute(
        [
            "name" => $_POST['mesa']
        ]
    );
    $game = $consultaSearch->fetch();

    if (!empty($game) and password_verify($_POST['mesaPass'], $game['password'])) {
        $sqlJoin = "INSERT INTO player_game (`player_id`, `game_id`, `order`, `points`) VALUES (:player_id, :game_id, :order, :points)";

        $consultaJoin = $bd->prepare($sqlJoin);
        $consultaJoin->execute(
            [
                "player_id" => $_SESSION['player_id'],
                "game_id" => $game['game_id'],
                "order" => 1,
                "points" => 0
            ]
        );

        if ($consultaJoin) {
            $_SESSION["game"] = $_POST['createMesaPass'];
            header("Location:game.php");
            exit;
        } else {
            return $error = 'Error al buscar la mesa';
        }
    }
}

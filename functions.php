<?php

session_start();

$func = $_POST['func'];

switch ($func) {
    case 'rollDices':
        rollDices();
        break;
    default:
        break;
}

function rollDices()
{
    $dice1 = (rand(1, 6));
    $dice2 = (rand(1, 6));

    echo "<div class='col m-3 dice dice-" . $dice1 . "' id='dice2'></div>" .
        "<div class='col m-3 dice dice-" . $dice2 . "' id='dice2'></div>";
}

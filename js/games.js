jQuery(function () {

    if (isTokenExpired()) {
        loadError();
        return false;
    } else {
        ajaxGetGames();
        ajaxGetStartedGames();
    }
});

function loadGames(json) {
    let games = json.results;

    $('#gamesAvailable').html('');

    games.forEach(game => {
        $('#gamesAvailable').append(`
            <div class="col">
                <div class="card border-3">
                    <div class="card-body ">
                        <h5 class="card-title">${game.name}</h5>
                        <small class="d-none gameId">${game.id}</small>
                    </div><ul class="list-group list-group-flush">${getPlayersUnestarted(game)}</ul>
                    <div class="card-footer">
                        ${buttonToJoinGame(game)}
                        ${pWaitingToStart(game)}
                        ${buttonToStartIfHost(game)}
                        ${smallHostText(game)}
                    </div>
                </div>
            </div>`);

        if (game.host === localStorage.getItem('username')) {
            disableCreateButton();
        }
    });

}

function loadStartedGamesWherePlayerIs(json) {
    let games = json.results;

    $('#gamesIn').html('');

    games.forEach(game => {
        $('#gamesIn').append(`
            <div class="col">
                <div class="card border-3">
                    <div class="card-body ">
                        <h5 class="card-title">${game.name}</h5>
                        <small class="d-none gameId">${game.id}</small>
                    </div>
                    <table class="card-table table table-light table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Puntos</th>
                            </tr>
                        </thead>
                        <tbody>
                        ${getPlayersStarted(game)}
                        </tbody>
                    </table>
                    <div class="card-footer">
                        ${buttonToContinue(game)}
                        ${smallHostText(game)}
                    </div>
                </div>
            </div>`);

        if (game.host === localStorage.getItem('username')) {
            disableCreateButton();
        }
    });

};

function colourPoints(points) {
    if (points <= 1) {
        return `<span class="text-danger">${points}</span>`;
    }
    return points;

}

function buttonToContinue(game) {
    if (game.turn === localStorage.getItem('username')) {
        return `<a class="btn btn-primary me-5 shake" id="yourTurn" href="/game.html?id=${game.id}"><img class="turned-30" src="assets/icons/two-dices.svg" width="32px"></img> Tu turno!</a>`;
    }

    return `<a class="btn btn-secondary me-5" id="continueGame" href="/game.html?id=${game.id}">Continuar</a>`;

}

function buttonToJoinGame(game) {
    let players = game.players.results;
    let username = localStorage.getItem('username');

    if (!players.includes(username)) {
        console.log("can join");
        return `<a class="btn btn-secondary me-5 joinGame">Unirse</a>`;
    }

    if (players.length >= 4) {
        return `<a class="btn btn-secondary me-5 joinGame" disabled>Unirse</a>`;
    }
    return '';
}

function pWaitingToStart(game) {
    if (game.players.results.includes(localStorage.getItem('username')) && game.host !== localStorage.getItem('username')) {
        return `<small class="list-group-item text-secondary mb-1">Esperando a que el host inicie la partida</small>`;
    }
    return '';
}

function smallHostText(game) {
    if (game.host === localStorage.getItem('username')) {
        return `<small class="text-primary fw-bold fs-5 text-nowrap">Creada por ti</small>`
    }
    return `<small class="text-muted text-nowrap">Creado por ${game.host}</small>`
}

function buttonToStartIfHost(game) {
    if (game.players.results.length === 1 && game.host === localStorage.getItem('username')) {
        return `<button class="btn btn-secondary me-5" disabled="disabled">Iniciar partida</button>`;
    }

    if (game.host === localStorage.getItem('username')) {
        return `<button class="btn btn-primary me-5" id="startGame">Iniciar</button>`;
    }
    return '';
}

function getPlayersStarted(game) {
    let players = game.players.results;
    let result = [];
    console.log(game);


    players.forEach(player => {
        result.push(`<tr">
        <td>${player.name}</td>
        <td class="fw-bold">${colourPoints(player.points)}</td>
        </tr>`);

        if (player.name === localStorage.getItem('username')) {
            result[result.length - 1] = `<tr class="table-primary">
            <td>${player.name}</td>
            <td class="fw-bold">${colourPoints(player.points)}</td>
            </tr>`;
        }
        if (game.turn === player.name) {
            result[result.length - 1] = `<tr class="table-info">
            <td>Turno de ${player.name}</td>
            <td class="fw-bold">${colourPoints(player.points)}</td>
            </tr>`;
        }
    });

    return result.join('');

}

function getPlayersUnestarted(game) {
    let players = game.players.results;
    let result = [];
    console.log(game);


    players.forEach(player => {
        result.push(`<li class="list-group-item">${player}</li>`);

        if (player === localStorage.getItem('username')) {
            result[result.length - 1] = `<li class="list-group-item list-group-item-info">${player}</li>`;
        }
        if (game.turn === player) {
            result[result.length - 1] = `<li class="list-group-item list-group-item-primary">Turno de ${player}</li>`;
        }
    });

    return result.join('');

}

function serverGameValidator(data) {
    if (data.error === "There is already a game with that name") {
        alert("Ya existe una partida con ese nombre");
    }
}

function loadError() {
    $('main').html(`
        <div class="container">
            <div class="row mt-5">
                <div class="col-12 p-0 ">
                    <div class="alert alert-danger m-0 text-center" role="alert">
                        <h2 class="alert-heading p-4">Error!</h2>
                        <h5 class="p-4">No se han encontrado partidas o no has iniciado sesión</h5>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function loadPassModal(gameId, gameName) {
    $('#passModalTitle').html("");
    $('#gamePassword').val("");

    $('#passModalTitle').append(gameName);
    $('#gameId').val(gameId);
    $('#passModal').modal('show');

    console.log("Erasing modal pass");
}

function loadCreateGameModal() {
    $('#createGameModal').modal('show');

    $('#createGameModal').on('hidden.bs.modal', function () {
        $('#createGameName').val("");
        $('#createGamePassword').val("");
        $('#createGamePoints').val("");
    });

}

function loadErrorModal() {
    $('#errorModal').modal('show');
}

function disableCreateGameModal() {
    $('#createGameModal').modal('hide');
    $('#createGameName').val("");
    $('#createGamePassword').val("");
    $('#createGamePoints').val("");
    $('#createGame').prop('disabled', true);

    disableCreateButton();

}

function disableCreateButton() {
    $('#createGame').attr('disabled', true);
    $('#createGame').removeClass('btn-primary').addClass('btn-secondary');
    $('#createGame').html('<i class="fa fa-xmark m-2" width="48px"></i>Ya has creado una partida');
}

function joinGame(gameId, password) {
    console.log("Joining game...");
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/join_game",
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        data: ({
            game_id: gameId,
            player_name: localStorage.getItem('username'),
            game_pass: password
        }),
        success: function (json) {
            console.log(json);
        },
        error: function (result) {
            loadErrorModal();
        }
    });
    ajaxGetGames();
}

function createGame(gameName, password, points) {
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/create_game",
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        data: ({
            host_name: localStorage.getItem('username'),
            game_name: gameName,
            game_password: password,
            max_points: points
        }),
        success: function (json) {
            ajaxGetGames();
            disableCreateGameModal();
        },
        error: function (result) {
            console.log(result);
            serverGameValidator(result.responseJSON);
        }
    });

}

function startGame() {
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/start_game",
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        data: ({
            game_id: $('#startGame').parent().parent().find('.gameId').text(),
            host_name: localStorage.getItem('username')
        }),
        success: function (json) {
            ajaxGetStartedGames();
            ajaxGetGames();
        },
        error: function (result) {
            console.log(result);
        }
    });
};

function ajaxGetGames() {

    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/playable_games",
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            loadGames(result);
        },
        error: function (result) {
            console.log(result);
            loadError();
        }
    });
    return false;
}

function ajaxGetStartedGames() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/started_games/" + localStorage.getItem('username'),
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            loadStartedGamesWherePlayerIs(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
    return false;
}




$('#gamesAvailable').on('click', '.joinGame', function (event) {
    event.preventDefault();

    let gameName = $(this).parent().parent().find('.card-title').text();
    let gameId = $(this).parent().parent().find('.gameId').text();

    loadPassModal(gameId, gameName);

});

$('#createGame').on('click', function (event) {

    loadCreateGameModal();

});

$('#search').on('keyup', (event) => {
    $(".card-title").each(function () {
        if ($(this).text().search(event.target.value) > -1) {
            $(this).closest('.col').show();
        } else {
            $(this).closest('.col').hide();
        }
    });
});



$("#aceptPassword").on("submit", function (event) {
    event.preventDefault();

    let password = $('#gamePassword').val();
    let gameId = $('#gameId').val();

    joinGame(gameId, password);

    $('#passModal').modal('hide');
    ajaxGetGames();
    ajaxGetStartedGames();
});

$("#acceptCreateGame").on("click", function (event) {
    event.preventDefault();

    let gameName = $('#createGameName').val();
    let password = $('#createGamePassword').val();
    let points = $('#createGamePoints').val();

    $('#createGameModal').modal('hide');

    createGame(gameName, password, points);

});

$("body").on('click', '#startGame', function (event) {
    event.preventDefault();
    console.log('starting game');
    startGame();
});
function loadGames(json) {
    let games = json.results;

    $('#gamesAvailable').html('');

    games.forEach(game => {
        $('#gamesAvailable').append(`
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${game.name}</h5>
                    </div><ul class="list-group list-group-flush">${getPlayers(game)}</ul>
                    <div class="card-footer">
                        ${buttonToJoinGame(game)}
                        ${pWaitingToStart(game)}
                        ${buttonToStartIfHost(game)}
                        ${smallHostText(game)}
                    </div>
                </div>
            </div>`);

        if (game.host === localStorage.getItem('username')) {
            $('#createGame').attr('disabled', true);
            $('#createGame').html('Ya has creado una partida');
        }
    });

}

function buttonToJoinGame(game) {
    let players = game.players.results;
    let username = localStorage.getItem('username');

    if (!players.includes(username)) {
        return `<a class="btn btn-secondary me-5 joinGame">Unirse</a>`;
    }

    if (players.length >= 4) {
        return `<a class="btn btn-secondary me-5 joinGame" disabled>Unirse</a>`;
    }
    return '';
}

function pWaitingToStart(game){
    if (game.players.results.includes(localStorage.getItem('username')) && game.host !== localStorage.getItem('username')) {
        return `<small class="list-group-item text-secondary mb-1">Esperando a que el host inicie la partida</small>`;
    }
    return '';
}

function smallHostText(game){
    if (game.host === localStorage.getItem('username')) {
      return   `<small class="text-primary fw-bold fs-5">Creada por ti</small>`
    }
return `<small class="text-muted">Creado por ${game.host}</small>`
}

function buttonToStartIfHost(game){
    if (game.players.results.length === 1) {
        return `<button class="btn btn-secondary me-5 startGame" disabled="disabled">Iniciar partida</button>`;
    }

    if (game.host === localStorage.getItem('username') ) {
        return `<a class="btn btn-primary me-5 startGame">Iniciar</a>`;
    }   
    return '';
}

function getPlayers(game) {
    let players = game.players.results;
    let result = [];

    players.forEach(player => {
        result.push(`<li class="list-group-item">${player}</li>`);

        if (player === localStorage.getItem('username')) {
            result[result.length - 1] = `<li class="list-group-item list-group-item-primary">${player}</li>`;
        }

    });

    return result.join('');

}

function loadError() {

    $('#gamesAvailable').removeClass('row-cols-md-3')
        .append(
            `<div class="col">
        <h2 class="text-center">No hay partidas disponibles o no has iniciado sesión</h2>
        </div>`
        );

}

function loadNotFound() {
    $('#gamesAvailable').removeClass('row-cols-md-3')
        .append(
            `<div class="col">
        <h2 class="text-center">No hay partidas disponibles o no has iniciado sesión</h2>
        </div>`
        );
}

function loadPassModal(gameName) {

    $('#passModalTitle').append(gameName);
    $('#passModal').modal('show');

    $("#passModal").on("hidden.bs.modal", function () {
        $('#passModalTitle').html("");
    });

    $("#aceptPassword").on("click", function () {

        let password = $('#gamePassword').val();

        $('#passModal').modal('hide');

        joinGame(gameName, password);

    });
}

function loadCreateGameModal() {
    $('#createGameModal').modal('show');

    $("#acceptCreateGame").on("click", function (event) {
        event.preventDefault();

        let gameName = $('#createGameName').val();
        let password = $('#createGamePassword').val();
        let points = $('#createGamePoints').val();

        $('#createGameModal').modal('hide');

        createGame(gameName, password, points);

    });

}

function joinGame(gameName, password) {
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/join_game",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        data: ({
            game_name: gameName,
            player_name: localStorage.getItem('username'),
            game_pass: password
        }),
        success: function (json) {
            console.log(json);
        },
        error: function (result) {
            console.log(result);
        }
    });
    ajaxGetGames();
}

function createGame(gameName, password, points) {
    $.ajax({
        type: "POST",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/create_game",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        data: ({
            host_name: localStorage.getItem('username'),
            game_name: gameName,
            game_password: password,
            max_points: points
        }),
        success: function (json) {
            ajaxGetGames();
        },
        error: function (result) {
            console.log(result);
            serverGameValidator(result.responseJSON);
        }
    });
    
}

function serverGameValidator(data) {
    if (data.error === "There is already a game with that name") {
        alert("Ya existe una partida con ese nombre");
    }
}

function ajaxGetGames() {

    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/playable_games",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
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

jQuery(function () {

    ajaxGetGames();

});


$('#gamesAvailable').on('click', '.joinGame', function (event) {
    event.preventDefault();

    let gameName = $(this).parent().parent().find('.card-title').text();

    loadPassModal(gameName);

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
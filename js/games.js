function loadGames(json) {
    let count = json.count;
    let games = json.results;

    games.forEach(game => {
        console.log(game);
        $('#gamesAvailable').append(`
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${game.name}</h5>
                    </div><ul class="list-group list-group-flush">${getPlayers(game)}</ul>
                    <div class="card-footer">
                        <a href="#" class="btn btn-secondary me-5">Unirse</a>
                        <small class="text-muted">Creado por ${game.host}</small>
                    </div>
                </div>
            </div>`);
});
}

function getPlayers(game){
    let players = game.players.results;
    let result = [];

    players.forEach(player => {
        result.push(`<li class="list-group-item">${player}</li>`);
    });

    return result.join('');
    
}

jQuery(function () {

    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/playable_games",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem('token') },
        success: function (result) {
            console.log(result);
            loadGames(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
    return false;
});


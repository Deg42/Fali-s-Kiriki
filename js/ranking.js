jQuery(function () {

    getFinishedGames();
});

function getFinishedGames() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/finished_games",
        success: function (json) {
            console.log(json);
            handlerInfo(json);
        },
        error: function (result) {
            console.log(result);
            handlerError(result.responseJSON);
        }
    });
}

function handlerInfo(json) {

    let games = json.results;
    let winners = games.map(game => game.winner);
    console.log(winners);

    // -- Dummie data --
    winners.push( 'Manolito', 'Deg', 'Deg', 'Deg', 'Deg', 'Dummie', 'Ejemplo', 'Ejemplo', 'Deg', 'Deg', 'Deg', 'Deg', 'Dummie', 'Ejemplo', 'Ejemplo', 'Ejemplo', 'Ejemplo', 'Usuario', 'Juan');
    // -- Dummie data --

    let winnersCount = winners.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    createTopPlayers(winnersCount);

}

function createTopPlayers(winnersCount) {
    let topPlayers = [];
    for (let key in winnersCount) {
        topPlayers.push({
            name: key,
            count: winnersCount[key]
        });
    }

    topPlayers.sort((a, b) => b.count - a.count);

    topPlayers = topPlayers.slice(0,5);

    console.log(topPlayers);

    topPlayersHtml = '';
    topPlayers.forEach(winner => {
        topPlayersHtml += `
        <tr class="fs-5">
        <td>${winner.name}</td>
        <td class="fw-bold">${winner.count}</td>
        </tr>`;
    });

    $('#rank').append(topPlayersHtml);

}
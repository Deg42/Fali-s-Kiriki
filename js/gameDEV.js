const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const gameId = urlParams.get('id');


jQuery(function () {

    if (isTokenExpired()) {
        loadError();
        return false;
    }

    gameData();

});

function gameData() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/game?player_name=" + localStorage.getItem('username') + "&game_id=" + gameId,
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            loadData(result);
        },
        error: function (result) {
            loadError();
            console.log(result);
        }
    });
}

function loadData(result) {
    if (result.turn !== localStorage.getItem('username')) {
        $('#decide').addClass('d-none');
        $('#roll').addClass('d-none');
        $('#bid').addClass('d-none');
        $('#turnOf').html(result.turn);
    }

    if (result.turn === localStorage.getItem('username')) {
        $('#spectate').addClass('d-none');
        getLastBid();

        
    }
}

function getLastRoll() {
    $.ajax({
        type: "GET",
        datatype: "json",
        url: "https://api-kiriki.herokuapp.com/api/get_last_roll?player_name=" + localStorage.getItem('username') + "&game_id=" + gameId,
        headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('token')).value },
        success: function (result) {
            console.log(result);
            loadPointResultModal(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function loadPointResultModal(json) {
    console.log(json.point_loser)

    json.point_loser === localStorage.getItem('username')
        ? $('#whosLoser').addClass('text-danger').html('Has perdido')
        : $('#whosLoser').addClass('text-success').html(json.point_loser + ' ha perdido');

    $('#loserResult').html(
        `El jugador anterior ha sacado 
        <span class="fw-bold fst-italic">${json.roll_value}</span> 
        y dijo que tenía 
        <span class="fw-bold fst-italic">${json.bid_value}</span>`
    );
    $('#pointDice1').addClass('dice-' + json.roll_1);
    $('#pointDice2').addClass('dice-' + json.roll_2);


    $('#resultModal').modal('show');

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#test').on('click', function (e) {
    $('#resultModal').modal('show');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


















function changeToBid() {
    console.log("changeToBid");
    $('#roll').addClass('d-none');
    $('#bid').removeClass('d-none');
};








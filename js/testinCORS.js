$("#testing").on("click", function (event) {
    event.preventDefault();
    $.get({
        type: "GET",
        dataType: "json",
        url: "https://api-kiriki.herokuapp.com/admin/players/?token=kirikikey",
        headers: { "Access-Control-Allow-Origin": "*" },
        success: function (result) {
            console.log(result);
        },
        error: function (result) {
            console.log(result);
        }
    });
    return false;
});
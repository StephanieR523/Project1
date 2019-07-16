
$(document).ready(function () {

    // THIS IS DEEZER API
    $("#search-music-btn").on("click", function () {
        event.preventDefault();

        var value = $("#song-title-input2").val()
        var queryURL = "http://104.200.17.235:8081/cors/"

        // console.log("you clicked")
        // console.log(value)

        // MAKING AN AJAX CALL TO THE DEEZER API
        $.ajax({
            url: queryURL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                url: "https://api.deezer.com/search?q=" + value + "&limit=05"

            })
        }).then(function (response) {
            var parse = JSON.parse(response)
            // console.log(parse)

            for (var i = 0; i < 5; i++) {

                // CREATING VARIABLE FOR THE TITLE, ALBUM, AND ARTIST NAME
                var songTitle = parse.data[i].title;
                var artistName = parse.data[i].artist.name;
                var albumName = parse.data[i].album.title;

                // CREATING NEW ROWS IN HTML WITH DATA  
                var newRow = $("<tr>").attr("id", "datas").append(
                    $("<td>").html(songTitle),
                    $("<td>").html(artistName),
                    $("<td>").html(albumName),
                    $("<td>").html("<input type='button' value='Video Link' class='btn btn-secondary' id='videoBtn'>"),
                );
                $("#music-table > tbody").prepend(newRow);

                // GETTING ANOTHER AJAX REQUEST
                // CREATING YOUTUBE API
                $("#videoBtn").on("click", function () {
                    console.log("you clicked")

                    for (var i = 0; i < 5; i++) {
                        function displayVideoSearch() {
                            // var searchTerm = $("#songtitle");
                            var queryURL = " https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + songTitle + "&topicId=%2Fm%2F04rlf&type=video&key=AIzaSyBdKCyg7sttppX9lC9j18Rpdz99RddVhXA";
                            console.log(queryURL);

                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            }).then(function (response) {
                                var videoIds = JSON.stringify(response.items[0].id.videoId);;
                                var videoLink = "https://www.youtube.com/watch?v=" + videoIds;
                                console.log(response)
                                $("#videoBtn").click(function () {
                                    document.location.href = (videoLink.replace(/['"]+/g, ''))
                                });

                                console.log(response.items[0].snippet.title);
                                console.log(videoIds.replace(/['"]+/g, ''));
                            });
                        }
                        // CALLING THE FUNCTIONS 
                        displayVideoSearch();
                    }
                })
            }
        })
    })

})

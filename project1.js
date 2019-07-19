

// BEFORE USING THIS FILE USE project1.html FROM GITHUB BRANCH TO COMPARE THE id's AND classes



$(document).ready(function () {

    // THIS IS DEEZER API
    $("#search-music-btn").on("click", function () {
        event.preventDefault();
        
        var value = $("#song-title-input2").val()
        var queryURL = "https://api.deezer.com/search?q=" + value + "&limit=05"
        
        // console.log("you clicked")
        // console.log(value)
        
        // MAKING AN AJAX CALL TO THE DEEZER API
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/' + queryURL,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
          }).then(function (response) {
            var parse = (response)
            // console.log(parse)
            
            for (var i = 0; i < 5; i++) {

                // CREATING VARIABLE FOR THE TITLE, ALBUM, AND ARTIST NAME
                var songTitle = parse.data[i].title;
                var artistName = parse.data[i].artist.name;
                var albumName = parse.data[i].album.title;
                
                // -------- AJAX CALL FOR YOUTUBE API ------------
                
                // ---------------------------------------------
                
                
                    // var searchTerm = $("#songtitle");
                    console.log(queryURL2);
                    
                    
                    
                    // CREATING NEW ROWS IN HTML WITH DATA  
                    var newRow = $("<tr>").attr("id", "datas").append(
                        $("<td>").html(songTitle).attr("id", "titleID" + i),
                        $("<td>").html(artistName),
                        $("<td>").html(albumName),
                        $("<td>").html("<input type='button' value='Video Link' class='btn btn-secondary videoBtn'>").attr("id", "buttonID" + i)
                        );
                        var title = $("#titleID0").html();
                        console.log(title);
                        $("#music-table > tbody").append(newRow);
                        // var newRow = $("<tr>").append(
                        //     $("<td>").text(response.results.trackmatches.track[i].name).attr('id', 'trackID' + i),
                        //     $("<td>").text(response.results.trackmatches.track[i].artist).attr('id', 'artistID' + i),
                        //     $("<td>").text("unknown").attr('id', 'albumNameID' + i),
                        //     //$("<td>").text("unknown").attr('id', 'albumReleaseID' + i ),
                        //     $("<td>").html("<a href='" + theHref + "'" + "target='_blank'" + "class='btn button'>" + "Last.fm LINK!</a>"),
                        //     $("<td>").html("<a href='" + theHref + "'" + "target='_blank'" + "id='youTubeLinkID" + i + "'" + "class='btn button'>" + "YouTube LINK!</a>")
                            
                        // );
                        // // Append the new row to the table
                        // //console.log("append the row to the table")
                        // $("#music-table > tbody").append(newRow);
                    }
                    
                    var queryURL2 = " https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + songTitle + "&topicId=%2Fm%2F04rlf&type=video&key=AIzaSyBzkN-i1rf5WcSS9GFfRx0Xu2XxyhJwVX4";
                    
                    $.ajax({
                        url: queryURL2,
                        method: "GET",
                
                        //async: false, // THIS SYNCHRONISE THE AJAX CALL IN ORDER BUT ONLY ONE VIDEO WORKING.
                
                    }).then(function (response) {
                        var videoIds = JSON.stringify(response.items[0].id.videoId);;
                        var videoLink = "https://www.youtube.com/watch?v=" + videoIds;
                        console.log(response)
                        $(".videoBtn").click(function () {
                            document.location.href = (videoLink.replace(/['"]+/g, ''))
                        });
                
                        console.log(response.items[0].snippet.title);
                        console.log(videoIds.replace(/['"]+/g, ''));
                    });
                    // CALLING THE FUNCTIONS 
                

            
        })
    })
})





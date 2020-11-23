/* Notes section for how I want to pull things.
on the button press for each genre card, take the ID of the card to pass into the iTunesApiCall. 
ON the response each songs' following info and stick it into an array:
1. Artist: response.tracks.track[].artist.name
2. SongTitle: response.tracks.track[].name

iterrate the array into the list where it shows up as Artits - Song Name

On clicking one of the songs in the list, on the right side the Lyrics (https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime)
will appear along with the Album cover (last.fm API/ response.results.songs.data.attributes.artwork.url

*/
// This is the new Nav bar and its mobile responsive
$(document).ready(function () {
$('.sidenav').sidenav();
  // Variables
  var artistName = "";
  var songName = "";
  var genreTitle = $(".card-title");
  var apiKey = "6f9af90b658b61feec3b4d25a8309963";
  var genre = "";

  // FUNctions! SO MUCH FUN!!!!

  if (localStorage.getItem("genre-selection")) {
    //Setting the genre variable based on the selection made
    genre = localStorage.getItem("genre-selection").trim();
    console.log(genre);
    var lastFmApiCall =
      "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" +
      genre +
      "&api_key=" +
      apiKey +
      "&format=json&limit=10";
    console.log(lastFmApiCall);
    //Make the call to get and post the songs
    $.ajax({
      url: lastFmApiCall,
      method: "GET",
    }).then(getSongs);
  }

  // function clearGenre() {
  //     localStorage.setItem("genre-selection", "");
  // };

  function getSongs(response) {
    for (var i = 0; i < 10; i++) {
      //Variable to grab the dom element where we are displaying the list
      var songsListDiv = $(".collection");

      // Setting the List item up
      var songListEL = $("<li>").attr("class", "collection-item avatar");
      //This portion goes through the track array and pulls out the info we need.
      artistName = response.tracks.track[i].artist.name;
      songName = response.tracks.track[i].name;

      //Settings the spans
      var artistSpanEl = $("<span>")
        .attr("class", "artist-name")
        .text(artistName);
      var songSpanEL = $("<span>").attr("class", "song-name").text(songName);
      artistSpanEl.append("<br>");
      var playButton = $("<i>")
        .attr("class", "material-icons circle red")
        .text("play_arrow");

      //This section posts the items in an unordered list
      songListEL.append(playButton, artistSpanEl, songSpanEL);
      songsListDiv.append(songListEL);
      //this element binds the "onclick event" so that way the lyrics click will come up
      songListEL.bind("click", lyricsAPI);
    }
  }

  function getLyrics(response) {
    // Variables
    var songLyrics = "";
    songLyrics = response.lyrics;
    var lyricsDiv = $("div.col.s7");
    var song = localStorage.getItem("songName").trim();
    var artist = localStorage.getItem("artistName").trim();
    console.log(songLyrics);
    // Updating the DOM!
    lyricsDiv.children("h3").replaceWith("<h3>" + song + "</h3>");
    lyricsDiv.children("h5").replaceWith("<h5>" + artist + "</h5>");
    lyricsDiv.children("p").replaceWith("<p>" + songLyrics);
  }

  function lyricsAPI() {
    // getting the artistName and songName assigned for the call, also running a check to ensure that we can pass information correctly to the API
    artistName = $(this).children(".artist-name").text().replace("&", "and");
    songName = $(this).children(".song-name").text().replace("&", "and");
    console.log(songName, artistName);
    //Storing the songName to be called in the child function
    localStorage.setItem("songName", songName);
    localStorage.setItem("artistName", artistName);
    //setting the API string here based upon which items are clicked.
    var lyricsApiCall =
      "https://api.lyrics.ovh/v1/" + artistName + "/" + songName;
    console.log(lyricsApiCall);
    //The API call to get the lyrics for the song based upon the Span Clicked
    $.ajax({
      url: lyricsApiCall,
      method: "GET",
    }).then(getLyrics);
  }

  // this function stores the genre from the card clicked on to be used on the following page
  function storeGenre() {
    genre = this.id;
    localStorage.setItem("genre-selection", genre);
    //console.log(genre);
  }

  // event listeners
  genreTitle.click(storeGenre);
});

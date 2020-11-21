/* Notes section for how I want to pull things.
on the button press for each genre card, take the ID of the card to pass into the iTunesApiCall. 
ON the response each songs' following info and stick it into an array:
1. Artist: response.tracks.track[].artist.name
2. SongTitle: response.tracks.track[].name

iterrate the array into the list where it shows up as Artits - Song Name

On clicking one of the songs in the list, on the right side the Lyrics (https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime)
will appear along with the Album cover (last.fm API/ response.results.songs.data.attributes.artwork.url

Rock
R&B
Classical
Classic Rock
Alternative Rock
Rap
Metal
Pop
Latin
Jazz
EDM
Country
Reggae
zydeco
Techno
Blues

*/

// Variables
var artistName = "";
var songName = "";
var genre ="";
var genreEl = $(".card-image");
var songButton = $(".collection-item avatar");
var apiKey = "6f9af90b658b61feec3b4d25a8309963";
var lyricsApiCall = "https://api.lyrics.ovh/v1/" + artistName +"/" + songName;
var lastFmApiCall = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + genre +"&api_key="+apiKey+"&format=json&limit=10";

// FUNctions! SO MUCH FUN!!!!

function clearGenre() {
    localStorage.setItem("genre-selection", "");
}

function getSongs(response) {
    for (var i = 0; i < 10; i++){
        //Variable to grab the dom element where we are displaying the list
        var songsListDiv = $(".collection");

        // Setting the List item up
        var songListEL = $("<li>").setAttribute("class", "collection-item avatar");
        //This portion goes through the track array and pulls out the info we need.
        artistName = response.tracks.track[i].artist.name;
        songName = response.tracks.track[i].name;
        
        //Settings the spans
        var artistSpanEl = $("<span>").setAttribute("class", "artist-name").text(artistName);
        var songSpanEL = $("<span>").setAttribute("class", "song-name").text(songName);
        artistSpanEl.append("<br>");
        var playButton = $("<i>").setAttribute("class", "material-icons circle red").text("play_arrow");

        //This section posts the items in an unordered list
        songListEL.append(playButton, artistSpanEl, songSpanEL);
        songsListDiv.append(songListEL);

    };
};

function getLyrics(response) {
    // Variables
    var lyrics = response.lyrics;
    var lyricsDiv = $(".col s7");
    // May as well post those lyrics since we got em!
    lyricsDiv.append("<p>").text(lyrics);
};

function lyricsAPI() {
    // getting the artistName and songName assigned for the call
    artistName = $(".artist-name").text();
    songName = $("song-name").text();

    //Setting the Song title in the Lyrics area
    var lyricsDiv = $(".col s7");
    var songTitle = $("<h3>").text(songName);
    lyricsDiv.append(songTitle);

    //The API call to get the lyrics for the song based upon the Span Clicked
    $.ajax({
        url: lyricsApiCall,
        method: "GET"
    }).then(getLyrics);
};

// this function stores the genre from the card clicked on to be used on the following page
function storeGenre() {
    genre = genreEl.attr("id");
    localStorage.setItem("genre-selection", JSON.stringify(genre));
    console.log(genre);
};



if (localStorage.getItem("genre-selection")){
    //Setting the genre variable based on the selection made
    genre = JSON.parse(localStorage.getItem("genre-selection"));
    
    //Make the call to get and post the songs
    $.ajax({
        url: lastFmApiCall,
        method: "GET"
    }).then(getSongs);
};

// event listeners
songButton.addEventListener("click", lyricsAPI);
genreEl.addEventListener("click", storeGenre);
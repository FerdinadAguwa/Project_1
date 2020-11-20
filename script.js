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
var apiKey = "6f9af90b658b61feec3b4d25a8309963"
var lyricsApiCall = "https://api.lyrics.ovh/v1/" + artistName +"/" + songName;
var lastFmApiCall = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + genre +"&api_key="+apiKey+"&format=json&limit=10";

// FUNctions! SO MUCH FUN!!!!

function clearGenre() {
    localStorage.setItem("genre-selection", "");
}

function getSongs(response) {
    for (var i = 0; i < 10; i++){
        //Variable to grab the dom element where we are displaying the list
        var songsListDiv = $(/*"div class="songListDiv"*/);
        //This portion goes through the track array and pulls out the info we need.
        artistName = response.tracks.track[i].artist.name;
        songName = response.tracks.track[i].name;
        
        //Setting the Artist and Song name in a list
        var songButton = $("<button>").text(artistName + " -- " + songName);

        //This section posts the items in an unordered list
        songsListDiv.append(songButton);

    }
};

function getLyrics() {
    // Variables
    var lyrics = response.lyrics;
    var lyricsDiv = $(/*"div class=lyricsDiv*/);
    // May as well post those lyrics since we got em!
    lyricsDiv.append("<p>").text(lyrics);
};


function storeGenre() {
    localStorage.setItem("genre-selection", JSON.stringify(genre));
};

if (localStorage.getItem("genre-selection")){
    //Settings the genre variable based on the selection made
    genre = JSON.parse(localStorage.getItem("genre-selection"));
    
    //Make the call to get and post the songs
    $.ajax({
        url: lastFmApiCall,
        method: "GET"
    }).then(getSongs);
}

// 
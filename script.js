/* Notes section for how I want to pull things.
on the button press for each genre card, take the ID of the card to pass into the iTunesApiCall. 
ON the response each songs' following info and stick it into an array:
1. Artist: response.tracks.track[].artist.name
2. SongTitle: response.tracks.track[].name




iterrate the array into the list where it shows up as Artits - Song Name

On clicking one of the songs in the list, on the right side the Lyrics (https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime)
will appear along with the Album cover (iTunes API/ response.results.songs.data.attributes.artwork.url

Rock
R&B
Classical
Classic Rock
Alternative Rock
Rap
Metal
Pop

*/

// Variables
var artistName = "";
var songName = "";
var genre ="";
var apiKey = "6f9af90b658b61feec3b4d25a8309963"
var lyricsApiCall = "https://api.lyrics.ovh/v1/" + artistName +"/" + songName;
var lastFmApiCall = "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=" + genre +"&api_key="+apiKey+"&format=json&limit=10";



// 
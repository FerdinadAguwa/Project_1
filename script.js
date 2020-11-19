/* Notes section for how I want to pull things.
on the button press for each genre card, take the ID of the card to pass into the iTunesApiCall. 
ON the response each songs' following info and stick it into an array:
1. Artist: response.results.songs.data.attributes.artistName
2. SongTitle: response.results.songs.data.attributes.name

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
var lyricsApiCall = "https://api.lyrics.ovh/v1/" + artistName +"/" + songName;
var iTunesApiCall = "https://api.music.apple.com/v1/catalog/{storefront}/charts?types=songs&genre=" + /* genreID */ + "&limit=10";

// 
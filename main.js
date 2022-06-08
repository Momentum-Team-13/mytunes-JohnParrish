console.log("connected")

let search = document.querySelector(".search")
let searchb = document.querySelector(".searchb")
let results = document.querySelector(".songs")
let text = document.querySelector(".text")


searchb.addEventListener("click", (event) => {
    event.preventDefault()
    results.innerHTML = ""
    console.log(search.value)
    const input = search.value
    let tuneurl = `https://itunes.apple.com/search?term=${input}&entity=song&limit=18`

    
    fetch(tuneurl, {
        method: 'GET',
        headers: { 'Content-Type': 'applications/json' }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data.results.length === 0) {
                console.log("no results")
                text.innerText = `No results`
            } else {
                text.innerText = `Please click a picture to preview a song!`
            console.log(data.results[0])
            buildSongs(data.results)
        }
        })
        .catch(err => {
            console.error(err)
        })
})

function buildSongs(resultsArray) {
    for (let track of resultsArray) {

        let songs = document.createElement("div")
        songs.classList.add("songprofile")

        let imageElement = document.createElement("img")
        imageElement.src = `${track.artworkUrl100}`
        imageElement.alt = `song artwork`
        songs.appendChild(imageElement)

        let bandElement = document.createElement("h3")
        bandElement.innerText = `${track.artistName}`
        songs.appendChild(bandElement)

        let nameElement = document.createElement("p")
        nameElement.innerText = `${track.trackName}`
        songs.appendChild(nameElement)

        imageElement.addEventListener("click", (event) => {
            console.log("Play!")
            let sound      = document.querySelector('audio');
            sound.id       = 'audio-player';
            sound.controls = 'controls';
            sound.src      = `${track.previewUrl}`;
            sound.type     = 'audio/mpeg';
            console.log(sound.src)
        })

        results.appendChild(songs)
    }
}

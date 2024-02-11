const gasButton = document.getElementById('Gas')
const trashButton = document.getElementById('Trash')
const gameText = document.getElementById('gameName')
let previousSongLink

gasButton.addEventListener('click', () => {
    addSongLink()
})

trashButton.addEventListener('click', () => {
    addSongLink()
})

async function addSongLink() {
    const apiKey = '67cc20d6ad021446f9696a0cb1922436'

    async function getRandomLastFmTrackAndEmbedVideo() {
        const limit = 50

        while (true) {
            const page = Math.floor(Math.random() * 10) + 1
            const url = `https://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=${apiKey}&limit=${limit}&page=${page}&format=json`

            try {
                const response = await fetch(url)
                const data = await response.json()

                const randomTrackIndex = Math.floor(Math.random() * limit)
                const randomTrack = data.tracks.track[randomTrackIndex]

                if (randomTrack) {
                    const songTitle = randomTrack.name
                    const artist = randomTrack.artist.name
                    gameText.innerText = `${songTitle} - ${artist}`

                    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songTitle + ' ' + artist)}`

                    const songLinkDiv = document.createElement('div')
                    songLinkDiv.classList.add('songLink')

                    const anchorTag = document.createElement('a')
                    anchorTag.href = searchUrl
                    anchorTag.textContent = 'Click to play song'
                    anchorTag.style.textDecoration = 'none'
                    anchorTag.target = '_blank'

                    songLinkDiv.appendChild(anchorTag)

                    if (previousSongLink) {
                        previousSongLink.remove()
                    }

                    document.body.appendChild(songLinkDiv)

                    previousSongLink = songLinkDiv

                    break
                }
            } catch (error) {
                console.error('Error fetching and embedding:', error)
            }
        }
    }

    getRandomLastFmTrackAndEmbedVideo()
}
addSongLink()

buttonSelection = 1
function spawnFallingButton() {
    const button = document.createElement('img')
    button.id = 'fallingButton'
    document.body.appendChild(button)

    const randomMargin = 25
    const randomPosition = Math.random() * (window.innerWidth - 2 * randomMargin) + randomMargin
    button.style.zIndex = '0'
    if (buttonSelection == 1) {
        button.src = '/Gas button.png'
        buttonSelection = 2
    } else {
        button.src = '/Trash button.png'
        buttonSelection = 1
    }
    button.width = '120'
    button.style.left = `${randomPosition}px`

    button.addEventListener('animationend', () => {
        document.body.removeChild(button)
    })
}
setInterval(spawnFallingButton, 250)
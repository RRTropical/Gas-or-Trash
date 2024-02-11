const gasButton = document.getElementById('Gas')
const trashButton = document.getElementById('Trash')
const gameText = document.getElementById('gameName')
let figureElement = null

gasButton.addEventListener('click', getRandomGame)
trashButton.addEventListener('click', getRandomGame)

async function getRandomGame() {
    if (figureElement) {
        document.body.removeChild(figureElement)
    }

    const functionUrl = '/.netlify/functions/game'

    try {
        const response = await fetch(functionUrl)
        const data = await response.json()
        const randomGame = data.results[0]
        const gameId = randomGame.id
        gameText.innerText = randomGame.name

        const screenshotsUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=0dfc1b8b7b814b3997d47a5395a4c8bb`
        const responseScreenshots = await fetch(screenshotsUrl)
        const screenshotsData = await responseScreenshots.json()
        const screenshots = screenshotsData.results.slice(0, 3)

        figureElement = document.createElement('figure')
        figureElement.style.display = 'flex'
        figureElement.style.justifyContent = 'center'
        figureElement.style.alignItems = 'center'
        figureElement.style.gap = '10px'

        screenshots.forEach(screenshot => {
            const imgElement = document.createElement('img')
            imgElement.src = screenshot.image
            imgElement.alt = 'Game Screenshot'
            imgElement.style.width = '300px'
            imgElement.style.height = '200px'

            imgElement.addEventListener('load', () => {
                imgElement.classList.add('loaded')
            })

            figureElement.appendChild(imgElement)
        })

        document.body.appendChild(figureElement)
    } catch (error) {
        console.error('Failed to fetch data:', error)
    }
}

getRandomGame()

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
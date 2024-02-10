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

        const screenshotsUrl = `/api/games/${gameId}/screenshots`
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

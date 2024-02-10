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

    const key = process.env.GAME_API
    const apiUrl = 'https://api.rawg.io/api/games'
    const randomPage = Math.floor(Math.random() * 1000) + 1

    const response = await fetch(`${apiUrl}?key=${key}&page=${randomPage}&page_size=1`)
    const data = await response.json()
    const randomGame = data.results[0]
    const gameId = randomGame.id
    gameText.innerText = randomGame.name
    const screenshotsUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${key}`
    const response_1 = await fetch(screenshotsUrl)
    const screenshotsData = await response_1.json()
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
}
getRandomGame()
const gasButton = document.getElementById('Gas')
const trashButton = document.getElementById('Trash')
const gameText = document.getElementById('gameName')

gasButton.addEventListener('click', () => {
    getImage()
})

trashButton.addEventListener('click', () => {
    getImage()
})

function getImage() {
    const randomPage = Math.floor(Math.random() * 1000) + 1
    const apiUrl = `https://picsum.photos/v2/list?page=${randomPage}&limit=1&random=${Date.now()}`

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const randomImageInfo = data[0]
            const randomImageUrl = randomImageInfo.download_url
            const randomImageTitle = randomImageInfo.author
            const image = document.createElement('img')
            image.src = randomImageUrl
            image.height = 200
            image.width = 300

            gameText.innerText = `Author: ${randomImageTitle}`

            const existingImageContainer = document.querySelector('.image')
            if (existingImageContainer) {
                existingImageContainer.remove()
            }

            const containerDiv = document.createElement('div')
            containerDiv.appendChild(image)
            containerDiv.className = 'image'

            document.body.appendChild(containerDiv)

            image.onload = function () {
                image.classList.add('loaded')
            }

        })
        .catch(error => console.error('Error fetching data:', error))
}

getImage()

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
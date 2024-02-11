const gasButton = document.getElementById('Gas')
const trashButton = document.getElementById('Trash')
const skipButton = document.getElementById('skip')
const gameText = document.getElementById('gameName')
let figureElement = null

gasButton.addEventListener('click', getCharacter)
trashButton.addEventListener('click', getCharacter)
skipButton.addEventListener('click', getCharacter)

async function getCharacter() {
  try {
    const randomId = Math.floor(Math.random() * 731) + 1

    const apiUrl = `https://www.superheroapi.com/api.php/10230191613989593/${randomId}/image`
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const name = data.name
        const image = data.url
        gameText.innerText = name
        createFigureWithImages(image)
      })
      .catch(error => console.error('Error:', error))
  } catch (error) {
    console.error('There was a problem:', error)
  }
}

function createFigureWithImages(imageUrls) {
  if (!Array.isArray(imageUrls)) {
    imageUrls = [imageUrls]
  }

  if (figureElement && figureElement.parentNode === document.body) {
    document.body.removeChild(figureElement)
  }

  figureElement = document.createElement('figure')
  figureElement.style.display = 'flex'
  figureElement.style.justifyContent = 'center'
  figureElement.style.alignItems = 'center'
  figureElement.style.gap = '10px'

  imageUrls.forEach(url => {
    const imgElement = document.createElement('img')
    imgElement.src = url.trim()
    imgElement.alt = 'Food Image'
    imgElement.style.width = '300px'
    imgElement.style.height = '200px'

    imgElement.addEventListener('load', () => {
      imgElement.classList.add('loaded')
    })

    figureElement.appendChild(imgElement)
  })

  document.body.appendChild(figureElement)
}

getCharacter()

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
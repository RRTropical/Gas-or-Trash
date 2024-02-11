const gasButton = document.getElementById('Gas')
const trashButton = document.getElementById('Trash')
const gameText = document.getElementById('gameName')
let figureElement = null

gasButton.addEventListener('click', getFood)
trashButton.addEventListener('click', getFood)

async function getFood() {
  const apiKey = '6146cfac4cc74bba86d9712c11b7efd1'
  const apiUrl = 'https://api.spoonacular.com/recipes/random'

  try {
    const response = await fetch(`${apiUrl}?number=1&apiKey=${apiKey}`)
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const recipeData = await response.json()
    const randomRecipe = recipeData.recipes[0]
    const recipeId = randomRecipe.id
    gameText.innerText = randomRecipe.title

    const screenshotsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    const screenshotsResponse = await fetch(screenshotsUrl)
    if (!screenshotsResponse.ok) {
      throw new Error('Failed to fetch recipe images')
    }
    const screenshotsData = await screenshotsResponse.json()
    const imageUrls = screenshotsData.image.split(',').slice(0, 3)

    createFigureWithImages(imageUrls)
  } catch (error) {
    console.error('There was a problem:', error)
  }
}

function createFigureWithImages(imageUrls) {
  if (figureElement) {
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
getFood()

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
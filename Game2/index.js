const gasButton = document.getElementById('Gas')
const trashButton = document.getElementById('Trash')
const gameText = document.getElementById('gameName')
let figureElement = null

gasButton.addEventListener('click', getMovie)
trashButton.addEventListener('click', getMovie)

async function getMovie() {
  const apiKey = process.env.MOVIE_API
  const apiUrl = 'https://api.themoviedb.org/3/discover/movie'

  let isValid = false
  let movieData

  while (!isValid) {
    try {
      const randomPage = Math.floor(Math.random() * 1000) + 1
      const response = await fetch(`${apiUrl}?api_key=${apiKey}&page=${randomPage}&page_size=1`)
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      movieData = await response.json()
      if (movieData.results && movieData.results.length > 0) {
        isValid = true
      }
    } catch (error) {
      console.error('There was a problem:', error)
    }
  }

  const randomMovie = movieData.results[0]
  const movieId = randomMovie.id
  gameText.innerText = `${randomMovie.title}`

  const screenshotsUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
  const screenshotsResponse = await fetch(screenshotsUrl)
  if (!screenshotsResponse.ok) {
    console.error('Failed to fetch movie screenshots')
    return
  }
  const screenshotsData = await screenshotsResponse.json()
  const screenshots = screenshotsData.backdrops.slice(0, 3)

  if (figureElement) {
    document.body.removeChild(figureElement)
  }

  figureElement = document.createElement('figure')
  figureElement.style.display = 'flex'
  figureElement.style.justifyContent = 'center'
  figureElement.style.alignItems = 'center'
  figureElement.style.gap = '10px'

  screenshots.forEach(screenshot => {
    const imgElement = document.createElement('img')
    imgElement.src = `https://image.tmdb.org/t/p/w500/${screenshot.file_path}`
    imgElement.alt = 'Movie Screenshot'
    imgElement.style.width = '300px'
    imgElement.style.height = '200px'

    imgElement.addEventListener('load', () => {
      imgElement.classList.add('loaded')
    })

    figureElement.appendChild(imgElement)
  })

  document.body.appendChild(figureElement)
}
getMovie()
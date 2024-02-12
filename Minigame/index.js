buttonSelection = 1
function spawnFallingButton() {
    const button = document.createElement('img')
    button.id = 'fallingButton'
    document.body.appendChild(button)

    const randomMargin = 25
    const randomPosition = Math.random() * (window.innerWidth - 2 * randomMargin) + randomMargin
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
    button.addEventListener('click', () => {
        console.log('Click')
        button.remove()
    })
}
setInterval(spawnFallingButton, 500)
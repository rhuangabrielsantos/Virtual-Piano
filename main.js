const keys = document.querySelectorAll(".key")

function playNote(event) {
    let audioKeyCode = getAudioKeyCode(event)

    const key = getKeyPressed(audioKeyCode)

    const keyNotExists = !key

    if (keyNotExists) {
        return;
    }

    playAudio(audioKeyCode)
    addPlayingClass(key)
}

function getAudioKeyCode(event) {
    const isKeyboard = event.type === "keydown"

    if (isKeyboard) {
        return event.keyCode
    }

    return parseInt(event.target.dataset.key)
}

function getKeyPressed(audioKeyCode) {
    return document.querySelector(`.key[data-key="${audioKeyCode}"]`)
}

function playAudio(audioKeyCode) {
    const audio = document.querySelector(`audio[data-key="${audioKeyCode}"]`)

    audio.currentTime = 0;
    audio.play()
}

function addPlayingClass(key) {
    key.classList.add('playing')
}

function removePlayingClass(event) {
    event.target.classList.remove('playing')
}

function registerEvents() {
    keys.forEach(key => {
        key.addEventListener("click", playNote)
        key.addEventListener("transitionend", removePlayingClass)
    })

    document.addEventListener("keydown", playNote)
}

window.addEventListener("load", registerEvents)
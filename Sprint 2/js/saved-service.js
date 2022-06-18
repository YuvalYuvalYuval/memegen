'use strict'
const gSavedImgs = loadFromLocalStorage(STORAGE_KEY) ? loadFromLocalStorage(STORAGE_KEY) : []



function addImgToSaved() {
    const imgSrc = gElCanvas.toDataURL()
    const img = createImage(imgSrc)
    gSavedImgs.push(img)
    saveToLocalStorage(STORAGE_KEY, gSavedImgs)
}


function createImage(imgSrc) {
    return {
        id: getRandomId(),
        url: imgSrc
    }
}
//GETTERS

function getSavedImgs() {
    return gSavedImgs
}

//UTILS
function getRandomId() {
    const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)]
    const digit = DIGITS[Math.floor(Math.random() * DIGITS.length)]
    return letter + digit
}
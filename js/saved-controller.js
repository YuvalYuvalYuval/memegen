'use strict'
const elSaved = document.querySelector('.saved-container')

function onSaveImg() {
    addImgToSaved()
}

function onGoToSaved() {
    document.querySelector('.edit-screen').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'none'
    renderSavedImgs()
    document.querySelector('.saved-container').style.display = 'grid'
}

function renderSavedImgs() {
    const imgs = getSavedImgs()
    const strHtmls = imgs.map(img =>
        `<img onClick="onImgSelect('${img.id}')"src=${img.url} alt="saved-meme">`)

    elSaved.innerHTML = strHtmls.join('')
}
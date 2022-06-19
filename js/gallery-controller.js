'use strict'
const elGallery = document.querySelector('.gallery')

function init() {
    renderGallery()
    renderSuggestionSizes()
}

//RENDER VIEW
function renderGallery() {
    const imgs = getImgsToShow()
    const strHtmls = imgs.map(img =>
        `<img onClick="onImgSelect(${img.id})"src=${img.url} alt="meme">`)

    elGallery.innerHTML = strHtmls.join('')

}
function renderSuggestionSizes() {
    const suggestions = document.querySelectorAll('.suggestions li')
    suggestions.forEach(suggestion => renderSuggestionSize(suggestion.id))
}

function renderSuggestionSize(keyId) {
    const elSuggestion = document.getElementById(keyId)
    const currSize = getCurrSuggestionSize(keyId)
    elSuggestion.style.fontSize = `${currSize}px`
}

function toggleAbout() {
    document.querySelector('.about').classList.toggle('hidden')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}


//EVENTS FROM VIEW
function onImgSelect(imgId) {
    generateRandomLines()
    setCurrImg(imgId)
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.saved-container').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'none'
    renderMeme()
}

function onSearchMemes() {
    const searchTxt = document.querySelector('.text-input').value
    setSearchFilter(searchTxt)
    renderGallery()
    updateKeywordSearchCountMap(searchTxt)
    renderSuggestionSize(searchTxt)
}

function onSuggestionClick(keyId) {
    setSearchFilter(keyId)
    updateKeywordSearchCountMap(keyId)
    renderSuggestionSize(keyId)
    renderGallery()
}

function onRandom() {
    const imgId = getRandomImgId()
    onImgSelect(imgId)
}

function onGoToGallery() {
    document.querySelector('.edit-screen').style.display = 'none'
    document.querySelector('.saved-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'block'
    document.querySelector('.search-bar').style.display = 'flex'
    document.querySelector('.search-bar .text-input').value = ''
    setSearchFilter('')
    renderGallery()
}
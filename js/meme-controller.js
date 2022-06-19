'use strict'
const gElCanvas = document.querySelector('.edit-canvas')
const gCtx = gElCanvas.getContext('2d')

setCanvasSize()

window.onresize = () => {
    resizeCanvas();
}

//EVENTS FROM VIEW

function onEditTxt(value) {
    setLineTxt(value)
    renderMeme()
}

function onChangeTxtColor(color) {
    setTxtColor(color)
    renderMeme()
}

function onChangeFontSize(value) {
    setFontSize(value)
    document.querySelector('.font-size').innerText = value
    renderMeme()
}

function onSwitchLine() {
    const meme = getCurrMeme()
    if (meme.lines.length === 0) return
    switchLine()
    const lineIdx = getCurrentLine()
    document.getElementById('current-line').innerText = lineIdx + 1
    drawRectAround(lineIdx)
}

function onAligne(way) {
    setAlign(way)
    renderMeme()
}

function onDeleteLine() {
    deleteCurrLine()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onMoveTxt(way) {
    moveLine(way)
    renderMeme()
}

function onSetFontFamily(font) {
    setFontFamily(font)
    renderMeme()
}

function onChangeStrokeWidth(value) {
    setStrokeWidth(value)
    document.querySelector('.stroke-size').innerText = value
    renderMeme()
}

function onChangeStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

// RENDER VIEW

function setCanvasSize() {
    if (window.innerWidth >= 900) {
        gElCanvas.width = 650
        gElCanvas.height = 650
    } else {
        gElCanvas.width = 300
        gElCanvas.height = 300
    }
}

function renderMeme() {
    const currImg = getCurrImg()

    const memeImg = new Image()
    memeImg.onload = function () {
        gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText()
    }
    // memeImg.crossOrigin = "anonymous" //TODO - having trouble with that line (for saving to localStrorage as not tainted)
    memeImg.src = currImg.url
    document.querySelector('.edit-screen').style.display = 'flex'
}

function renderText() {
    const meme = getCurrMeme()

    gCtx.strokeStyle = meme.stroke.color
    gCtx.lineWidth = meme.stroke.width

    meme.lines.forEach(line => {
        gCtx.font = line.size + `px ${meme.fontFamily}`
        gCtx.textAlign = line.align
        gCtx.fillStyle = line.color

        gCtx.fillText(line.txt, line.position.x, line.position.y)
        gCtx.strokeText(line.txt, line.position.x, line.position.y)
    })
}

function drawRectAround(lineIdx) {
    const line = getLineByIdx(lineIdx)
    gCtx.beginPath()
    gCtx.rect(0, line.position.y + 5, gElCanvas.width, -line.size - 5)
    gCtx.strokeStyle = "black"
    gCtx.stroke()
    setTimeout(renderMeme, 700)
}

//CLEAR
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

//DOWNLOAD
function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}

//UPLOAD TO FB

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg") // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        //Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        //Create a link that on click will make a post in facebook with the image we uploaded
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share On Facebook  
        </a>`
    }
    //Send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    //Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    //Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })   //Gets the result and extract the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}
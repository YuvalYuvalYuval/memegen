'use strict'

var gCurrMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    fontFamily: 'Impact',
    stroke: {
        width: 0,
        color: 'black'
    },
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 25,
            align: 'center',
            color: 'white',
            position: {
                x: gElCanvas.width / 2,
                y: 50,
            }
        },
        {
            txt: 'But im always missing it',
            size: 25,
            align: 'center',
            color: 'white',
            position: {
                x: gElCanvas.width / 2,
                y: gElCanvas.height - 50,
            }
        },
    ],
}


var gDraggedLine

function switchLine() {
    if (++gCurrMeme.selectedLineIdx >= gCurrMeme.lines.length) gCurrMeme.selectedLineIdx = 0
}

function moveLine(way) {
    const linePos = gCurrMeme.lines[gCurrMeme.selectedLineIdx].position
    way === 'up' ? linePos.y -= 10 : linePos.y += 10
}

function deleteCurrLine() {
    gCurrMeme.lines.splice(gCurrMeme.selectedLineIdx, 1)
}

function addLine() {
    const newLine = createDefaultLine()
    gCurrMeme.lines.splice(1, 0, newLine) //add the line somewhere between the existing ones(model)
}

function createDefaultLine() {
    return {
        txt: 'Im The New Line You Asked For!',
        size: 25,
        align: 'center',
        color: 'white',
        position: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
        }
    }
}


// GETTERS

function getCurrMeme() {
    return gCurrMeme
}

function getCurrentLine() {
    return gCurrMeme.selectedLineIdx
}
function getLineByIdx(lineIdx) {
    return gCurrMeme.lines[lineIdx]
}

//SETTERS

function setLineTxt(value) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx]
    line.txt = value
}

function setTxtColor(color) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx];
    line.color = color
}
function setFontSize(value) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx];
    line.size = value
}

function setAlign(way) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx]
    line.align = way
}

function setStrokeWidth(value) {
    gCurrMeme.stroke.width = value
}

function setStrokeColor(color) {
    gCurrMeme.stroke.color = color
}

function setFontFamily(font) {
    gCurrMeme.fontFamily = font
    document.querySelector('.font-family select').style.fontFamily = font
}

//DRAG & DROP LINES
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

gElCanvas.addEventListener('mousemove', dragLine)
gElCanvas.addEventListener('mousedown', down)
gElCanvas.addEventListener('mouseup', up)
gElCanvas.addEventListener('mouseout', up)

gElCanvas.addEventListener('touchmove', dragLine)
gElCanvas.addEventListener('touchstart', down)
gElCanvas.addEventListener('touchend', up)


function down(ev) {
    const clickPos = getEvPos(ev)
    const clickedLine = getLineFromPos(clickPos)
    if (clickedLine) {
        document.body.style.cursor = 'grab'
        gDraggedLine = clickedLine
    }
}

function getLineFromPos(pos) {
    return gCurrMeme.lines.find(line =>
        line.position.y + 5 > pos.y && line.position.y - line.size - 5 < pos.y)
}

function up() {
    document.body.style.cursor = 'auto'
    gDraggedLine = ''
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function dragLine(ev) {
    if (!gDraggedLine) return;
    gDraggedLine.position = getEvPos(ev)
    renderMeme()
}

function resizeCanvas() {
    if (window.innerWidth >= 900) {
        gElCanvas.width = 650
        gElCanvas.height = 650
    } else {
        gElCanvas.width = 300
        gElCanvas.height = 300
    }
    if (window.innerWidth === 900) location.reload();
    if (document.querySelector('.edit-screen').style.display === 'flex') renderMeme()
}
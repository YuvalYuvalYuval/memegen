'use strict'

var gCurrMeme =
{
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
            size: 30,
            align: 'center',
            color: 'white',
            position: {
                x: gElCanvas.width / 2,
                y: 50,
            }
        },
        {
            txt: 'But im always missing it',
            size: 30,
            align: 'center',
            color: 'white',
            position: {
                x: gElCanvas.width / 2,
                y: gElCanvas.height - 50,
            }
        },
    ]
}

function switchLine() {
    gCurrMeme.selectedLineIdx++
    if (gCurrMeme.selectedLineIdx >= gCurrMeme.lines.length) gCurrMeme.selectedLineIdx = 0
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
        size: 30,
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
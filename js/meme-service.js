'use strict'

const memesSentences = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    'I`m a simple man i see vanilla JS, i click like!',
    'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    'JS Where everything is made up and the rules dont matter',
    'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    'Write hello world , add to cv 7 years experienced',
]

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
            txt: '',
            size: 20,
            align: 'center',
            color: 'white',
            position: {
                x: gElCanvas.width / 2,
                y: 50,
            }
        },
        {
            txt: '',
            size: 20,
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
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx]
    if (line) {
        way === 'up' ? line.position.y -= 10 : line.position.y += 10
    }
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
        txt: getRandomLine(),
        size: 20,
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

function generateRandomLines() {
    gCurrMeme.lines.forEach(line => {
        line.txt = getRandomLine()
    });
}

function getRandomLine() {
    const idx = Math.floor(Math.random() * memesSentences.length)
    return memesSentences[idx]
}

//SETTERS

function setLineTxt(value) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx]
    line.txt = value
}

function setTxtColor(color) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx];
    if (line) {
        line.color = color
    }
}
function setFontSize(value) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx];
    if (line) {
        line.size = value
    }
}

function setAlign(way) {
    const line = gCurrMeme.lines[gCurrMeme.selectedLineIdx]
    if (line) {
        line.align = way
    }
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
        updateSelctedLineIdx(clickedLine)
        document.body.style.cursor = 'grab'
        gDraggedLine = clickedLine
    }
}

function getLineFromPos(pos) {
    return gCurrMeme.lines.find(line =>
        line.position.y > pos.y && line.position.y - line.size < pos.y)
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

function updateSelctedLineIdx(clickedLine) {
    const idx = gCurrMeme.lines.findIndex(line => line === clickedLine)
    gCurrMeme.selectedLineIdx = idx
    document.getElementById('current-line').innerText = idx + 1
    drawRectAround(idx)
}
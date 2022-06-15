'use strict'

var gMeme = {
    selecterId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Enter text here',
        size: 40,
        font: 'David',
        align: 'left',
        color: 'red'
    }, {
        txt: 'Enter text here',
        size: 40,
        align: 'left',
        color: 'yellow',
    }]
}

function setImg(id) {
    gMeme.selecterId = id
}
function resetMeme() {
    gMeme = {
        selecterId: 1,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Enter text here',
            size: 40,
            align: 'left',
            color: 'red',
        }, {
            txt: 'Enter text here',
            size: 40,
            align: 'left',
            color: 'yellow',
        }
        ]
    }
}

function getMeme() {
    return gMeme
}

function setLineText(txt) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].txt = txt
    renderMeme()
}

function setTextColor(color) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = color
    renderMeme()
}

function increaseFontSize() {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].size++
    renderMeme()
}
function decreaseFontSize() {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].size--
    renderMeme()
}

function switchLines() {
    var meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx > meme.lines.length - 1) meme.selectedLineIdx = 0
}

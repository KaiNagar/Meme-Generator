'use strict'

var gMemeBoard = document.querySelector('.meme-board')




function renderMeme() {
    var meme = getMeme()
    var memeImg = gImgs.find(img => img.id === meme.selecterId)
    var img = new Image()
    img.src = memeImg.url
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        for (var i = 0; i < meme.lines.length; i++) {
            var line = meme.lines[i]
            gCtx.textAlign = line.align
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = line.strokeColor
            gCtx.fillText(line.txt, 40, 60 * (i + 1))
            gCtx.strokeText(line.txt, 40, 60 * (i + 1))
        }
    }
}

function onImgSelect(id) {
    setImg(id)
    document.querySelector('.line-txt').value = ''
    gMemeBoard.style.display = 'flex'
    gGallery.style.display = 'none'
    renderMeme()
}


function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme()
}
function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme()
}
function onSetLineText(txt) {
    setLineText(txt)
    renderMeme()
}
function onSetTextColor(color) {
    setTextColor(color)
    renderMeme()
}

function onSwitchLines() {
    var inputTxt = document.querySelector('.line-txt')
    switchLines()
    if (gMeme.lines[gMeme.selectedLineIdx].txt === 'Enter text here') inputTxt.value = ''
    else inputTxt.value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme()
}

function onSetStrokeColor(strokeColor){
    setStrokeColor(strokeColor)
    renderMeme()
}

function onSetAlign(align){
    setAlign(align)
    renderMeme()
}

function onSetFont(font){
    setFont(font)
    renderMeme()
}



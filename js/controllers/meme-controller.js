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
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.fillText(line.txt, 40, 60 * (i + 1))
        }
        // meme.lines.forEach(line => {
        //     gCtx.font = `${line.size}px ${line.font}`
        //     gCtx.fillStyle = line.color
        //     gCtx.fillText(line.txt, 40*, 60*)
        // })
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
}
function onDecreaseFontSize() {
    decreaseFontSize()
}
function onSetLineText(txt) {
    setLineText(txt)
}
function onSetTextColor(color) {
    setTextColor(color)
}

function onSwitchLines() {
    var inputTxt = document.querySelector('.line-txt')
    switchLines()
    if (gMeme.lines[gMeme.selectedLineIdx].txt === 'Enter text here') inputTxt.value = ''
    else inputTxt.value = gMeme.lines[gMeme.selectedLineIdx].txt
}



'use strict'

var gMemeBoard = document.querySelector('.meme-board')




function renderMeme() {
    // if(gIsRNG) {
    //     var meme = makeRngMeme()
    // }
    // else
    var meme = getMeme()

    var memeImg = gImgs.find(img => img.id === meme.selectedId)
    var img = new Image()
    img.src = memeImg.url
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        for (var i = 0; i < meme.lines.length; i++) {
            var line = meme.lines[i]

            var lineLength = line.txt.length
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = line.strokeColor

            gCtx.beginPath()
            if (i === meme.selectedLineIdx) gCtx.strokeStyle = 'red'
            else gCtx.strokeStyle = 'transparent'
            if (line.align === 'right') {
                gCtx.fillText(line.txt, line.pos.x - 230, line.pos.y)
                gCtx.strokeText(line.txt, line.pos.x - 230, line.pos.y)
                if (line.isSticker) continue
                gCtx.rect(line.pos.x - 240, line.pos.y - line.size, lineLength * 20, line.size * 1.5)
            } else if (line.align === 'center') {
                gCtx.fillText(line.txt, line.pos.x - 110, line.pos.y)
                gCtx.strokeText(line.txt, line.pos.x - 110, line.pos.y)
                if (line.isSticker) continue
                gCtx.rect(line.pos.x - 120, line.pos.y - line.size, lineLength * 20, line.size * 1.5)
            } else {
                gCtx.fillText(line.txt, line.pos.x, line.pos.y)
                gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
                if (line.isSticker) continue
                gCtx.rect(line.pos.x, line.pos.y - line.size, lineLength * 20, line.size * 1.5)
            }
            gCtx.stroke()
        }
    }
}

function onImgSelect(id, isSaved = false) {
    if (id === 0) {

    }
    const elSearch = document.querySelector('.content-filtering')
    const elBody = document.querySelector('.body')
    document.querySelector('.line-txt').value = ''
    gMemeBoard.style.display = 'flex'
    gGallery.style.display = 'none'
    elSearch.style.display = 'none'
    elBody.classList.add('canvas-open')
    if (isSaved) {
        var memes = getSavedMemes()
        var meme = memes.find((meme) => meme.selectedId === id)
        setGMemes(meme)
    }
    setImg(id)
    // resizeCanvas(id)
    // console.log(gCanvas.width);
    renderMeme()
}


function resizeCanvas(id) {
    var img = getGImgs()
    // gCanvas.width = 
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

function onSetStrokeColor(strokeColor) {
    setStrokeColor(strokeColor)
    renderMeme()
}

function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
}

function onSetFilterBy(el) {
    var value = ''
    var addSize = '1px'
    if (el.localName === 'span') {
        value = el.innerText.charAt(0).toLowerCase() + el.innerText.slice(1)
        var size = el.style.fontSize
        size = size.split('px')[0]
        size++
        el.style.fontSize = size + 'px'
    }
    else value = el
    setFilterBy(value)

}

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onMoveLine(direction) {
    moveLine(direction)
    renderMeme()
}

function onMakeRngMeme() {
    gIsRNG = true
    const elSearch = document.querySelector('.content-filtering')
    const elBody = document.querySelector('.body')
    document.querySelector('.line-txt').value = ''
    gMemeBoard.style.display = 'flex'
    gGallery.style.display = 'none'
    elSearch.style.display = 'none'
    elBody.classList.add('canvas-open')
    renderMeme()
}

function onAddSticker(sticker) {
    addSticker(sticker)
    renderMeme()
}



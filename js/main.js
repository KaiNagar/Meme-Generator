'use strict'

var gKeywordSearchCountMap = {}
var gCanvas
var gCtx

var gStartPos
var gGallery

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    gGallery = document.querySelector('.main-gallery')
    addListeners()
    renderGallery()
    getMeme()
    setSavedMemes()

}

function setView(pageName) {
    const elBody = document.querySelector('.body')
    const elSearch = document.querySelector('.content-filtering')
    resetMeme()
    switch (pageName) {
        case 'Gallery':
            renderGallery()
            gMemeBoard.style.display = 'none'
            elSearch.style.display = 'flex'
            gGallery.style.display = 'grid'
            elBody.classList.remove('canvas-open')
            break;
        case 'Memes':
            renderSavedMemes()
            gMemeBoard.style.display = 'none'
            elSearch.style.display = 'flex'
            gGallery.style.display = 'grid'
            elBody.classList.remove('canvas-open')
            break;
    }
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('click', () => {

    })
}



function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}
var hasInput = true
function onDown(ev) {
    const pos = getEvPos(ev)
    // var meme = getMeme()
    if (!isLineClicked(pos)) {
        return
    }
    // addInput(pos.x, pos.y)
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}
function onMove(ev) {
    const meme = getMeme()
    if (meme.lines[meme.selectedLineIdx].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderMeme()
    }

}
function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
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







//inline text change

function addInput(x, y) {
    var meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]
    var input = document.createElement('input');

    input.type = 'text';
    if(currLine.txt !=='Enter text here' )input.value = currLine.txt
    input.style.position = 'fixed';
    input.style.left = currLine.pos.x + 'px';
    input.style.top = currLine.pos.x + 'px';

    input.onkeydown = handleEnter;

    document.body.appendChild(input);

    input.focus();

    hasInput = true;
}
function handleEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
        drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
        document.body.removeChild(this);
        hasInput = false;
    }
}
function drawText(txt, x, y) {
    var meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]
    gCtx.textBaseline = 'top';
    gCtx.textAlign = 'left';
    gCtx.font = currLine.font;
    gCtx.fillText(txt, currLine.pos.x, currLine.pos.y);
}
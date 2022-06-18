'use strict'

var gMemeBoard = document.querySelector('.meme-board')
var gIsUserImg = false

//the big mama function doing all the hard work 
//details inside
function renderMeme() {
    if (gIsRNG) {
        var meme = makeRngMeme()
    }
    else {
        var meme = getMeme()
    }

    var memeImg = gImgs.find(img => img.id === meme.selectedId)

    //creating new img html and drawing it onto the canvas
    var img = new Image()
    img.src = memeImg.url
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        for (var i = 0; i < meme.lines.length; i++) {

            //setting some line settings for next step
            var line = meme.lines[i]
            var lineLength = line.txt.length
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = line.strokeColor


            gCtx.beginPath()

            //gCtx.measureText  i know i could have used this function but i was too invested in the way i already did and it will break my code to change it
            //if i will start over i for sure will do it the easy way xd
            //this right here doing everything related to the lines located in the for loop this will go each line and do the according setups.
            if (line.align === 'right') {
                gCtx.strokeStyle = line.strokeColor
                gCtx.fillText(line.txt, line.pos.x - 230, line.pos.y)
                gCtx.strokeText(line.txt, line.pos.x - 230, line.pos.y)
                if (line.isSticker) continue
                if (i === meme.selectedLineIdx) gCtx.strokeStyle = 'red'
                else gCtx.strokeStyle = 'transparent'
                gCtx.rect(line.pos.x - 240, line.pos.y - line.size, lineLength * 20, line.size * 1.5)
            } else if (line.align === 'center') {
                gCtx.textBaseLine = 'top'
                gCtx.strokeStyle = line.strokeColor
                gCtx.fillText(line.txt, line.pos.x - 110, line.pos.y)
                gCtx.strokeText(line.txt, line.pos.x - 110, line.pos.y)
                if (line.isSticker) continue
                if (i === meme.selectedLineIdx) gCtx.strokeStyle = 'red'
                else gCtx.strokeStyle = 'transparent'
                gCtx.rect(line.pos.x - 120, line.pos.y - line.size, lineLength * 20, line.size * 1.5)
            } else {
                gCtx.strokeStyle = line.strokeColor
                gCtx.fillText(line.txt, line.pos.x, line.pos.y)
                gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
                if (line.isSticker) continue
                if (i === meme.selectedLineIdx) gCtx.strokeStyle = 'red'
                else gCtx.strokeStyle = 'transparent'
                gCtx.rect(line.pos.x, line.pos.y - line.size, lineLength * 20, line.size * 1.5)
            }

            //after this step the canvas probably got a stroke for real tho ⬆
            gCtx.stroke()
        }
    }
}


//when clicking an image this function collecting all the info about the image and changing the window view to the canvas or saved memes
function onImgSelect(id, isSaved = false) {
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
        setGMeme(meme)
    }
    if (id === 0) setUserImg(101)
    else setImg(id)
    // resizeCanvas(id)
    // console.log(gCanvas.width);
    renderMeme()
}


function resizeCanvas(id) {
    var img = getGImgs()
    // gCanvas.width = 
}

//increasing line font
function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme()
}
//decreasing line font
function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme()
}
//setting/changing line text
function onSetLineText(txt) {
    setLineText(txt)
    renderMeme()
}
//setting/changing text color
function onSetTextColor(color) {
    setTextColor(color)
    renderMeme()
}
//switching lines on click + changing the input value to the line text
function onSwitchLines() {
    var inputTxt = document.querySelector('.line-txt')
    switchLines()
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    if (currLine.txt === 'Enter text here') inputTxt.value = ''
    else inputTxt.value = currLine.txt
    renderMeme()
}
//setting/changing stroke color of text or some imojis
function onSetStrokeColor(strokeColor) {
    setStrokeColor(strokeColor)
    renderMeme()
}

//setting/changing align side, dont know how much this effective if you can just move the line with drag but alright
function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

//setting/changing line font
function onSetFont(font) {
    setFont(font)
    renderMeme()
}
//saving curr meme to saved memes page
function onSaveMeme() {
    saveMeme()
}

//filtering the gallery images by input or by clicking the keywords + chaning the size of the clicked keyword
function onSetFilterBy(el) {
    var value = ''
    if (el.localName === 'span') {
        value = el.innerText.charAt(0).toLowerCase() + el.innerText.slice(1)
        var size = el.style.fontSize
        size = +size.split('rem')[0]
        size += 0.2
        console.log(size);
        el.style.fontSize = size + 'rem'
    }
    else value = el
    setFilterBy(value)
}

//adding new line to the meme
function onAddLine() {
    addLine()
    renderMeme()
}

//removing curr line from the meme
function onRemoveLine() {
    removeLine()
    renderMeme()
}
//function doesnt work so good after adding drag + not so usefull but basically moving the line up and down per click
function onMoveLine(direction) {
    moveLine(direction)
    renderMeme()
}

//creating a new meme totally randomized
//kinda broken for now
function onMakeRngMeme() {
    gIsRNG = true
    const elSearch = document.querySelector('.content-filtering')
    const elBody = document.querySelector('.body')
    document.querySelector('.line-txt').value = ''
    gMemeBoard.style.display = 'flex'
    gGallery.style.display = 'none'
    elSearch.style.display = 'none'
    elBody.classList.add('canvas-open')
    makeRngMeme()
    renderMeme()
}

//adding sticker to the canvas
function onAddSticker(sticker) {
    addSticker(sticker)
    renderMeme()
}

//showing more keywords
function onMoreKeywords(word) {
    const elWords = document.querySelector('.words-filtering')
    if (word === 'More') {
        elWords.classList.add('column')
        elWords.innerHTML =
            `<button onclick="onMoreKeywords(this.innerText)" class="more-keywords-btn">Less</button>
            <div class="keywords flex align-center" style="border-bottom-left-radius:0 ;
            border-bottom-right-radius:0 ;">
                <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Funny</span>
                <span onclick="onSetFilterBy(this)" style="font-size:0.8125rem;">Cat</span>
                <span onclick="onSetFilterBy(this)" style="font-size:1.25rem;">Men</span>
                <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Dog</span>
                <span onclick="onSetFilterBy(this)" style="font-size:0.9375rem;">Comic</span>
                <span onclick="onSetFilterBy(this)" style="font-size:2.1875rem;">Cute</span>
            </div>
            <div class="keywords flex align-center" style="border-radius:0;   ">
        <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Funny</span>
        <span onclick="onSetFilterBy(this)" style="font-size:0.8125rem;">Cat</span>
        <span onclick="onSetFilterBy(this)" style="font-size:1.25rem;">Men</span>
        <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Dog</span>
        <span onclick="onSetFilterBy(this)" style="font-size:0.9375rem;">Comic</span>
        <span onclick="onSetFilterBy(this)" style="font-size:2.1875rem;">Cute</span>
    </div>
    <div class="keywords flex align-center" style="border-top-left-radius:0 ;
    border-top-right-radius:0 ;">
    <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Funny</span>
    <span onclick="onSetFilterBy(this)" style="font-size:0.8125rem;">Cat</span>
    <span onclick="onSetFilterBy(this)" style="font-size:1.25rem;">Men</span>
    <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Dog</span>
    <span onclick="onSetFilterBy(this)" style="font-size:0.9375rem;">Comic</span>
    <span onclick="onSetFilterBy(this)" style="font-size:2.1875rem;">Cute</span>
    </div>`
    } else {
        elWords.classList.remove('column')
        elWords.innerHTML = `<button onclick="onMoreKeywords(this.innerText)" class="more-keywords-btn">More</button>
        <div class="keywords flex align-center">
            <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Funny</span>
            <span onclick="onSetFilterBy(this)" style="font-size:0.8125rem;">Cat</span>
            <span onclick="onSetFilterBy(this)" style="font-size:1.25rem;">Men</span>
            <span onclick="onSetFilterBy(this)" style="font-size:1.5625rem;">Dog</span>
            <span onclick="onSetFilterBy(this)" style="font-size:0.9375rem;">Comic</span>
            <span onclick="onSetFilterBy(this)" style="font-size:2.1875rem;">Cute</span>
        </div>`
    }
}


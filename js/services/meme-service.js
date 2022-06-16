'use strict'
const STORAGE_KEY = 'memesDB'

var gSavedMemes
var gFilteredImgs = []
var gIsRNG = false

const gTxts = []
const gFonts = ['David', 'poppings-light', 'poppins-medium', 'poppins-regular', 'poppins-semiBold', 'poppins-extraBold']
const gAligns = ['left', 'right', 'center']
const gMemesSentences = [
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
];

var gMeme = {
    selectedId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Enter text here',
        size: 40,
        font: 'David',
        align: 'center',
        color: 'red',
        pos: { x: 275, y: 50 },
        strokeColor: 'black',
        isSaved: false,
        isDrag: false,
    }, {
        txt: 'Enter text here',
        size: 40,
        font: 'David',
        align: 'center',
        color: 'yellow',
        pos: { x: 275, y: 500 },
        strokeColor: 'black',
        isSaved: false,
        isDrag: false,
    }]
}

function setImg(id) {
    gMeme.selectedId = id
}
function resetMeme() {
    gMeme = {
        selectedId: 1,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Enter text here',
            size: 40,
            font: 'David',
            align: 'center',
            color: 'red',
            pos: { x: 275, y: 50 },
            strokeColor: 'black',
            isSaved: false,
            isDrag: false,
        }, {
            txt: 'Enter text here',
            size: 40,
            font: 'David',
            align: 'center',
            color: 'yellow',
            pos: { x: 275, y: 500 },
            strokeColor: 'black',
            isSaved: false,
            isDrag: false,
        }
        ]
    }
}

function getMeme() {
    return gMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function setGMemes(val) {
    gMeme = val
}

function setSavedMemes() {
    gSavedMemes = _LoadMemeFromStorage()
    if (!gSavedMemes || gSavedMemes.length === 0) gSavedMemes = []
}

function setLineText(txt) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].txt = txt

}

function setTextColor(color) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = color

}

function increaseFontSize() {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].size++

}
function decreaseFontSize() {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].size--

}

function switchLines() {
    var meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx > meme.lines.length - 1) meme.selectedLineIdx = 0
}

function addLine() {
    var meme = getMeme()
    var newLine = {
        txt: 'Enter text here',
        size: 40,
        font: 'David',
        align: 'center',
        color: 'yellow',
        pos: { x: 275, y: 275 },
        strokeColor: 'black',
        isSaved: false,
        isDrag: false,
    }
    meme.lines.push(newLine)
}
function addSticker(sticker) {
    var meme = getMeme()
    var stickerLine = {
        txt: sticker,
        size: 40,
        pos: { x: 275, y: 225 },
        isDrag:false,
        isSticker:true
    }
    meme.lines.push(stickerLine)
}

function removeLine() {
    var meme = getMeme()
    var lineIdx = meme.selectedLineIdx
    meme.lines.splice(lineIdx, 1)
}

function moveLine(direction) {
    var meme = getMeme()
    switch (direction) {
        case 'down':
            meme.lines[meme.selectedLineIdx].pos.y += 5
            break;
        case 'up':
            meme.lines[meme.selectedLineIdx].pos.y -= 5
            break;
    }
}

function setStrokeColor(strokeColor) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].strokeColor = strokeColor
}

function setAlign(align) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = align
}

function setFont(font) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = font
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}
function _LoadMemeFromStorage() {
    return loadFromStorage(STORAGE_KEY)
}

function saveMeme() {
    gMeme.isSaved = true
    gSavedMemes.push(gMeme)
    _saveMemeToStorage()
}

function setFilterBy(value) {
    gFilteredImgs = []
    var imgs = getGImgs()
    imgs.forEach((img) => {
        img.keywords.forEach((word) => {
            if (word.includes(value)) {
                if (gFilteredImgs.includes(img)) gFilteredImgs.pop(img)
                gFilteredImgs.push(img)
            }
        })
    })
    renderMemesByFilter()
}

function makeRngMeme() {
    var imgs = getGImgs()
    var meme = {
        selectedId: getRandomIntInclusive(0, imgs.length - 1),
        selectedLineIdx: 0,
        lines: []
    }
    for (var i = 0; i < getRandomIntInclusive(1, 2); i++) {
        meme.lines.push(setRngLine())
    }
    return meme
}

function setRngLine() {
    return {
        txt: gMemesSentences[getRandomIntInclusive(0, gMemesSentences.length - 1)],
        size: getRandomIntInclusive(0, 60),
        font: gFonts[getRandomIntInclusive(0, gFonts.length - 1)],
        align: gAligns[getRandomIntInclusive(0, gAligns.length - 1)],
        color: getRandomColor(),
        pos: { x: getRandomIntInclusive(0, 300), y: getRandomIntInclusive(0, 500) },
        strokeColor: getRandomColor(),
        isSaved: false,
        isDrag: false,
    }
}

function downloadCanvas(elLink) {
    var meme = getMeme()
    var currLine = meme.lines[meme.selectedLineIdx]
    gCtx.beginPath()
    gCtx.strokeStyle = 'green'
    gCtx.rect(currLine.pos.x - 150, currLine.pos.y - 40, 300, currLine.size + 15)
    gCtx.stroke()

    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Your Canvas'
}

function uploadImg(elLink) {
    // if (elLink.innerText === '&nbsp;&nbsp;&nbsp;Upload') elLink.innerText === 'Share' 

    const imgDataUrl = gCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        elLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}


function isLineClicked(pos) {
    const elInput = document.querySelector('.line-txt')
    var meme = getMeme()
    var count = 0
    for (var i = 0; i < meme.lines.length; i++) {
        var currLine = meme.lines[i]
        var linePos = { x: currLine.pos.x - 150, y: currLine.pos.y - 40 }
        if (pos.x < linePos.x + 300 &&
            pos.y < linePos.y + 55 &&
            pos.x > linePos.x &&
            pos.y > linePos.y) {
            meme.selectedLineIdx = count
            if (currLine.txt === 'Enter text here') elInput.value = ''
            else elInput.value = currLine.txt
            return true
        }
        count++
    }
    return false
}

function setLineDrag(isDrag) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].isDrag = isDrag
}

function moveLine(x, y) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].pos.x += x
    meme.lines[meme.selectedLineIdx].pos.y += y
}


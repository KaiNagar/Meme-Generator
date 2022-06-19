'use strict'
const STORAGE_KEY = 'memesDB'

var gSavedMemes
var gFilteredImgs = []
var gIsRNG = false

var gUserImg

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
//setting current image
function setImg(id) {
    var meme = getMeme()
    meme.selectedId = id
}

//reseting meme to default values
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

//getting gmeme
function getMeme() {
    return gMeme
}
//getting saved memes
function getSavedMemes() {
    return gSavedMemes
}

// setting gmeme
function setGMeme(val) {
    gMeme.selectedId = val
}

// setting saved memes
function setSavedMemes() {
    gSavedMemes = _LoadMemeFromStorage()
    if (!gSavedMemes || gSavedMemes.length === 0) gSavedMemes = []
}

//setting line text
function setLineText(txt) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].txt = txt

}

// setting text color
function setTextColor(color) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = color

}
//increase font
function increaseFontSize() {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].size++

}

//decreas font
function decreaseFontSize() {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].size--

}

//switch lines
function switchLines() {
    var meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx > meme.lines.length - 1) meme.selectedLineIdx = 0
}

//addline with default values
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

//add sticker
function addSticker(sticker) {
    var meme = getMeme()
    var stickerLine = {
        txt: sticker,
        size: 40,
        pos: { x: 275, y: 225 },
        isDrag: false,
        isSticker: true
    }
    meme.lines.push(stickerLine)
}

//remove line
function removeLine() {
    var meme = getMeme()
    var lineIdx = meme.selectedLineIdx
    meme.lines.splice(lineIdx, 1)
}

//move line up ad down doesnt work right now
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

//setting stroke color
function setStrokeColor(strokeColor) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].strokeColor = strokeColor
}

//setting align side
function setAlign(align) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = align
}

//setting font style
function setFont(font) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = font
}


//saving gmeme to storage
function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

//getting gmeme from storage
function _LoadMemeFromStorage() {
    return loadFromStorage(STORAGE_KEY)
}

//saving current meme to saved meme in storage
function saveMeme() {
    gMeme.isSaved = true
    gSavedMemes.push(gMeme)
    _saveMemeToStorage()
}


//setting all memes by the filter and ready for render
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


//creating a random meme
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

//creating a random style line
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


//when user upload a photo to canvas doesnt work right now
function onImgInput(ev) {
    gIsUserImg = true
    loadImageFromInput(ev,renderGallery)
}

//user image thingy
function loadImageFromInput(ev,onImageReady) {
    var reader = new FileReader()
    reader.onload = function (event) {
        var url = event.target.result
        var newImg = {
            id: imgNextIdx++,
            url: url
        }
        setUserImg(newImg)
        newImg.onload = onImageReady()

    }
    reader.readAsDataURL(ev.target.files[0])
    
}
//uer ia=mage thigny
function setUserImg(img) {
    gImgs.unshift(img)
}



//clearing the line selected box
function clearSelectedLine() {
    var meme = getMeme()
    var emptyLine = {
        txt: '',
        pos: { x: 0, y: 1000 },
        isEmpty: true
    }
    meme.lines.push(emptyLine)
    meme.selectedLineIdx = (meme.lines.length) - 1
}

//downloading canvas
function downloadCanvas(elLink) {
    clearSelectedLine()
    renderMeme()

    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Your Canvas'
}

//uploading canvas to facebook
//or sending it where ever on mobile whats app gmail or stuff like that
function uploadImg(elLink) {
    elLink.innerText = 'Uploading...'
    const imgDataUrl = gCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.location.href =  `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    }
    doUploadImg(imgDataUrl, onSuccess)
}

// uploading thingy
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

//checing if clicking a line
//this part is messy and hard coded as i learned about measure text function only after i was too deep into the code
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


//setting line is being draged
function setLineDrag(isDrag) {
    var meme = getMeme()
    if (meme.lines[meme.selectedLineIdx].isEmpty) return
    meme.lines[meme.selectedLineIdx].isDrag = isDrag
}

//dragin the line
function moveLine(x, y) {
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].pos.x += x
    meme.lines[meme.selectedLineIdx].pos.y += y
}


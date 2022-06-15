'use strict'

var gMeme = {
    selecterId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Enter text here',
        size: 40,
        font: 'David',
        align: 'left',
        color: 'red',
        strokeColor:'black'
    }, {
        txt: 'Enter text here',
        size: 40,
        font: 'David',
        align: 'left',
        color: 'yellow',
        strokeColor:'black'
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
            font: 'David',
            align: 'left',
            color: 'red',
            strokeColor:'black'
        }, {
            txt: 'Enter text here',
            size: 40,
            font: 'David',
            align: 'left',
            color: 'yellow',
            strokeColor:'black'
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
function setStrokeColor(strokeColor){
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].strokeColor = strokeColor
}

function setAlign(align){
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = align
}

function setFont(font){
    var meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = font
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Your Canvas'
}

function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Share   
     </a>`
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

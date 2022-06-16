'use strict'
var imgNextIdx = 1
var gImgs = [
    { id:0, url: "photos/upload.png", keywords: ['upload', 'load', 'my','new'] },
    { id: imgNextIdx++, url: "photos/1.jpg", keywords: ['donald trump', 'president', 'moron','men'] },
    { id: imgNextIdx++, url: "photos/2.jpg", keywords: ['puppies', 'dogs', 'cute'] },
    { id: imgNextIdx++, url: "photos/3.jpg", keywords: ['puppie', 'dog', 'baby','cute'] },
    { id: imgNextIdx++, url: "photos/4.jpg", keywords: ['cat', 'sleep', 'cute'] },
    { id: imgNextIdx++, url: "photos/5.jpg", keywords: ['baby', 'swag', 'cute'] },
    { id: imgNextIdx++, url: "photos/6.jpg", keywords: ['mainblown', 'amzaing', 'funny','men'] },
    { id: imgNextIdx++, url: "photos/7.jpg", keywords: ['baby', 'funny', 'cute'] },
    { id: imgNextIdx++, url: "photos/8.jpg", keywords: ['funny', 'actor', 'men'] },
    { id: imgNextIdx++, url: "photos/9.jpg", keywords: ['baby', 'funny', 'evil'] },
    { id: imgNextIdx++, url: "photos/10.jpg", keywords: ['president', 'funny', 'men','barak obama'] },
    { id: imgNextIdx++, url: "photos/11.jpg", keywords: [ 'kiss', 'fight','men'] },
    { id: imgNextIdx++, url: "photos/12.jpg", keywords: ['men', 'what will you do', 'you'] },
    { id: imgNextIdx++, url: "photos/13.jpg", keywords: ['actor', 'men', 'cheers'] },
    { id: imgNextIdx++, url: "photos/14.jpg", keywords: ['men', 'metrix', 'swag'] },
    { id: imgNextIdx++, url: "photos/15.jpg", keywords: ['men', 'LOTR', '0','zero'] },
    { id: imgNextIdx++, url: "photos/16.jpg", keywords: ['funny', 'men', 'startrak'] },
    { id: imgNextIdx++, url: "photos/17.jpg", keywords: ['putin', 'men', 'president'] },
    { id: imgNextIdx++, url: "photos/18.jpg", keywords: ['buzz', 'woodie', 'comic'] },
    { id: imgNextIdx++, url: "photos/19.jpg", keywords: ['puppies', 'dogs', 'cute'] },
    { id: imgNextIdx++, url: "photos/20.jpg", keywords: ['puppies', 'dogs', 'cute'] },
    { id: imgNextIdx++, url: "photos/21.jpg", keywords: ['puppies', 'dogs', 'cute'] },
    { id: imgNextIdx++, url: "photos/22.jpg", keywords: ['puppies', 'dogs', 'cute'] },
    // { id: imgNextIdx++, url: "photos/23.jpg", keywords: ['puppies', 'dogs', 'cute'] },
    // { id: imgNextIdx++, url: "photos/24.jpg", keywords: ['puppies', 'dogs', 'cute'] },
    // { id: imgNextIdx++, url: "photos/25.jpg", keywords: ['puppies', 'dogs', 'cute'] },
]

function renderGallery() {
    const elGrid = document.querySelector('.main-gallery')
    var strHtml = ''
    gImgs.forEach(img =>
        strHtml += `<img onclick="onImgSelect(${img.id})" class="img" src=${img.url} alt="">`
    )
    elGrid.innerHTML = strHtml
}


function renderSavedMemes() {
    const elGrid = document.querySelector('.main-gallery')
    var strHtml = ''
    for (var i = 0; i < gSavedMemes.length; i++) {
        var savedMeme = gSavedMemes[i]
        var id = savedMeme.selectedId
        var currImg = gImgs.find(img => img.id === id)
        strHtml += `<img onclick="onImgSelect(${currImg.id},${savedMeme.isSaved})" class="img img${currImg.id}" src=${currImg.url} alt="">`
    }
    elGrid.innerHTML = strHtml
}

function renderMemesByFilter() {
    const elGrid = document.querySelector('.main-gallery')
    var strHtml = ''
    gFilteredImgs.forEach(img =>
        strHtml += `<img onclick="onImgSelect(${img.id})" class="img img${img.id}" src=${img.url} alt="">`
    )
    elGrid.innerHTML = strHtml
}



function getGImgs() {
    return gImgs
}

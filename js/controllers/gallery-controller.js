'use strict'
var imgNextIdx = 1
var gImgs = [
    {id:imgNextIdx++,url:"photos/1.jpg",keywords:['donald trump', 'president' , 'moron']},
    {id:imgNextIdx++,url:"photos/2.jpg",keywords:['puppies', 'dogs' , 'cute']},
]

function renderGallery(){
    const elGrid = document.querySelector('.main-gallery')
    var strHtml = ''
    gImgs.forEach(img =>
        strHtml+= `<img onclick="onImgSelect(${img.id})" class="img img${img.id}" src=${img.url} alt="">`
        )
    elGrid.innerHTML = strHtml
}


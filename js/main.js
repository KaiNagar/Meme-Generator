'use strict'

var gKeywordSearchCountMap = {}
var gCanvas
var gCtx

var gGallery

function init() {
    gCanvas = document.getElementById('canvas');
    gCtx = gCanvas.getContext('2d');
    gGallery = document.querySelector('.main-gallery')
    renderGallery()
    getMeme()
}

function setView(pageName) {
    resetMeme()
    switch (pageName) {
        case 'Gallery':
            gMemeBoard.style.display = 'none'
            gGallery.style.display = 'grid'
            break;
    }
}



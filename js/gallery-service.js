'use strict';

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['politics', 'usa']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['dogs', 'cute']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['dogs', 'babies']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['cats', 'tech']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['classic', 'babies']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['tv', 'classic']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['babies', 'cute']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['movies', 'classic']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['babies', 'cute']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['politics', 'usa']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['sports', 'people']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['tv', 'israel']
    },
    {
        id: 12,
        url: 'img/13.jpg',
        keywords: ['usa', 'movies']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['tech', 'movies']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['movies', 'classic']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['tv', 'classic']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['politics', 'russia']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['movies', 'classic']
    },
];

var gSearchFilter = ''
var gKeywordSearchCountMap = {
    'classic': 40,
    'babies': 28,
    'politics': 17,
    'cats': 16,
    'tv': 20,
    'movies': 11
}

function updateKeywordSearchCountMap(key) {
    gKeywordSearchCountMap[key]++
}

//GETTERS

function getCurrImg() {
    const img = gImgs.find(img => img.id === gCurrMeme.selectedImgId)
    return img
}

function getImgsToShow() {
    if (!gSearchFilter) return gImgs
    return gImgs.filter(img => img.keywords.includes(gSearchFilter))
}

function getCurrSuggestionSize(keyId) {
    return gKeywordSearchCountMap[keyId]
}

//SETTERS 

function setCurrImg(imgId) {
    gCurrMeme.selectedImgId = imgId
}

function setSearchFilter(value) {
    gSearchFilter = value.toLowerCase()
}

function getRandomImgId() {
    return Math.floor(Math.random() * gImgs.length)
}
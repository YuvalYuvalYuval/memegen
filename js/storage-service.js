'use strict'

const STORAGE_KEY = 'memeDB'

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
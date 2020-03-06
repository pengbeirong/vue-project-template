import { isNotEmpty } from './myUtils'

export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key) => {
    let localKey = localStorage.getItem(key)
    if (isNotEmpty(localKey)) {
        try {
            localKey = JSON.parse(localStorage.getItem(key))
        } catch (err) {
            localKey = ''
        }
    } else {
        localKey = ''
    }
    return localKey
}

export const removeItem = (key) => {
    localStorage.removeItem(key)
}

export const clearAll = (key) => {
    localStorage.clear()
}

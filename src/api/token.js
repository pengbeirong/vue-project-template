import {
    getStorageTokenId,
    setStorageTokenId,
    removeStorageTokenId
} from './myStorage'

export const setTokenId = (tokenId) => {
    setStorageTokenId(tokenId)
}

export const getTokenId = () => {
    return new Promise((resolve) => {
        let tokenId = getStorageTokenId() 
        if (tokenId != null && tokenId !== undefined && tokenId.length > 0) {
            resolve(tokenId)
        } else {
            resolve('')
        }
    })
}

export const checkTokenId = async() => {
    return new Promise((resolve) => {
        let tokenId = getStorageTokenId() 
        if (tokenId != null && tokenId !== undefined && tokenId.length > 0) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
}

export const removeTokenId = () => {
    removeStorageTokenId()
}
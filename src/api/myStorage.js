import * as storageKey from 'src/config/storage.key'
import { removeItem } from 'src/utils/storage'

export const getStorageTokenId = () => {
    return localStorage.getItem(storageKey.TOKEN_ID)
}

export const setStorageTokenId = (tokenId) => {
    localStorage.setItem(storageKey.TOKEN_ID, tokenId)
}

export const removeStorageTokenId = () => {
    return removeItem(storageKey.TOKEN_ID)
}